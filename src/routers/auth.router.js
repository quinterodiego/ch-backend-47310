import express from 'express'
import passport from 'passport'

import UserController from '../controllers/users.contoller.js'

const userController = new UserController()
export const authRouter = express.Router()

authRouter.get('/', userController.loginView)

authRouter.post('/login', passport.authenticate('login'), userController.login)

authRouter.get('/register', userController.registerView)

authRouter.post('/register', passport.authenticate('register'), userController.register)

authRouter.get('/logout', userController.logout)

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/faillogin' }), (req, res) => {
  console.log('req.user => ', req.user)
  req.session.user = req.user
  return res.redirect('/products')
})

authRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'fail to login' })
})