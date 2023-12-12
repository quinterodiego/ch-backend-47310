import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import session from 'express-session'
import passport from 'passport'

import __dirname, { mongoStoreOptions } from './utils.js'
import './passport/strategies.passport.js'

import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import { productRouterView } from './routers/productsView.router.js'
import { cartRouterView } from './routers/cartView.router.js'
import messagesRouter from './routers/messages.router.js'
import { authRouter } from './routers/auth.router.js'

import connectMongoDB from './dao/mongoDB/connection.js'
import { MessagesModel } from './dao/mongoDB/models/messages.model.js'

const app = express()
const PORT = 8080

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', 'handlebars')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// CONNECT TO MONGODB
app.use(session(mongoStoreOptions))

// PASSPORT
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

connectMongoDB()

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