import express from 'express'

import { UserController } from '../controllers/users.contoller.js'
import { UserModel } from './../dao/mongoDB/models/users.model.js'

const userController = new UserController()
export const authRouter = express.Router()

authRouter.get('/', async (req, res) => {
  res.render('login', {})
})

authRouter.post('/login', userController.login)

authRouter.get('/register', (req, res) => {
  res.render('register', {})
})

authRouter.post('/register', userController.register)

authRouter.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return res.status(500).render('error', { error: 'No se pudo cerrar la sesión ' })
    }
    return res.redirect('/')
  })
})