import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import UserService from '../../services/user.services.js'

const userService = new UserService()

const strategyOptions = {
  usernameField: 'email',
  passportField: 'password',
  passReqToCallback: true
}

const signup = async(req, email, password, done) => {
  try {
    const user = await userService.findByEmail( email )
    if(user) return done(null, user)
    const newUser = await userService.registerUser(req.body)
    return done(null, newUser)
  } catch (error) {
    console.log(error)
    return done(null, false)
  }
}

const signin = async(req, email, password, done) => {
  try {
    const user = { email, password }
    const userLogin = await userService.loginUser(user)
    if(!userLogin) return done(null, false, { message: 'El usuario no existe' })
    return done(null, userLogin)
  } catch (error) {
    console.log(error)
    return done(null, false)
  }
}

const signUpStrategy = new LocalStrategy(strategyOptions, signup)
const signinStrategy = new LocalStrategy(strategyOptions, signin)

passport.use('register', signUpStrategy)
passport.use('login', signinStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await userService.getById(id)
  return done(null, user)
})