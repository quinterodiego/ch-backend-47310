import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"

import __dirname from './utils/utils.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import messagesRouter from './routers/messages.router.js'
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

// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chat', messagesRouter)

app.get('/chat', async (req, res) => {
    res.render('chat', {})
})

app.get('/', async (req, res) => {
  res.render('home', {})
})

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
      await MessageModel.create(data)
      const messages = await MessageModel.find()
      io.sockets.emit('messages', messages)
  })
})