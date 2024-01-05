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

import MainRouter from './routes/index.routes.js'

import connectMongoDB from './dao/mongoDB/connection.js'
import { MessagesModel } from './dao/mongoDB/models/messages.model.js'

const app = express()
const PORT = process.env.PORT || 8080
const persistence = process.env.PERSISTENCE
const mainRouter = new MainRouter()

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
app.use('/', mainRouter.getRouter())

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