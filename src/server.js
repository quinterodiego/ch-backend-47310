import config from './config/config.js'
import express from 'express'
import cookieParser from "cookie-parser"
import handlebars from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'

import __dirname, { mongoStoreOptions } from './utils.js'
import './config/passport/strategies.passport.js'
import './config/passport/strategies.google.js'
import './config/passport/strategies.jwt.js'
import { iniPassport } from './config/passport/strategies.github.js'
import MainRouter from './routes/index.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()
const PORT = config.PORT || 8080
const persistence = config.PERSISTENCE
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
app.use(errorHandler)

// CONNECT TO MONGODB
app.use(session(mongoStoreOptions))

// PASSPORT
iniPassport()
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/', mainRouter.getRouter())
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Página no encontrada"
  })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})