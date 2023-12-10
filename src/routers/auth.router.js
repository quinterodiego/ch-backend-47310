import express from 'express'

import UserController from '../controllers/users.contoller.js'

const userController = new UserController()
export const authRouter = express.Router()

authRouter.get('/', userController.loginView)

authRouter.post('/login', userController.login)

authRouter.get('/register', userController.registerView)

authRouter.post('/register', userController.register)

authRouter.get('/logout', userController.logout)