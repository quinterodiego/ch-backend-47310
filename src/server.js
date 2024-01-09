import 'dotenv/config'
import express from 'express'
import cookieParser from "cookie-parser"
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import session from 'express-session'
import passport from 'passport'

import __dirname, { mongoStoreOptions } from './utils.js'
import './config/passport/strategies.passport.js'
import './config/passport/strategies.google.js'
import './config/passport/strategies.jwt.js'
import { iniPassport } from './config/passport/strategies.github.js'

import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import {productRouterView} from './routes/productsView.routes.js'
import { cartRouterView } from './routes/cartView.routes.js'
import messagesRouter from './routes/messages.routes.js'
import { authRouter } from './routes/auth.routes.js'

import connectMongoDB from './config/connectionDB/connection.js'
import { MessagesModel } from './dao/mongoDB/messages/messages.model.js'

const app = express()
const PORT = process.env.PORT || 8080
const persistence = process.env.PERSISTENCE

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', 'handlebars')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(__dirname + '/public'))

// CONNECT TO MONGODB
app.use(session(mongoStoreOptions))

// PASSPORT
iniPassport()
app.use(passport.initialize())
app.use(passport.session())

// ROUTES APIS
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chat', messagesRouter)

// ROUTES VIEWS
app.use("/products", productRouterView);
app.use("/carts", cartRouterView);
app.get('/chat', async (req, res) => {
    res.render('chat', {})
})

app.use('/', authRouter)

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Página no encontrada"
  });
});

if(persistence === 'mongodb') await connectMongoDB()

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

// SOCKET
const io = new Server(server)
io.on('connection', async (socket) => {
  console.log(`Nueva conexion ${socket.id}`)
  const messages = await MessagesModel.find()

  socket.emit('messages', messages)

  socket.on('newMessage', async data => {
      await MessagesModel.create(data)
      const messages = await MessagesModel.find()
      io.sockets.emit('messages', messages)
  })
})