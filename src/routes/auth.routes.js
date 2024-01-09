import express from 'express'
import passport from 'passport'

import UserController from '../controllers/users.contoller.js'

const userController = new UserController()
export const authRouter = express.Router()

authRouter.get('/', userController.loginView)
authRouter.post('/login', passport.authenticate('login', { scope: ['user:email'] }), userController.login)

authRouter.get('/register', userController.registerView)
authRouter.post('/register', passport.authenticate('register'), userController.register)

authRouter.get('/logout', userController.logout)

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/faillogin' }), (req, res) => {
  req.session.user = req.user
  req.session.firstname = req.user.firstname
  req.session.lastname = req.user.lastname
  req.session.email = req.user.email
  req.session.role = req.user.role
  return res.redirect('/products')
})

authRouter.get('/faillogin', async (_, res) => {
  return res.json({ error: 'fail to login' })
})

authRouter.get('/auth/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), userController.loginGoogle)

authRouter.get('/current', passport.authenticate('jwtCookie'), userController.current)