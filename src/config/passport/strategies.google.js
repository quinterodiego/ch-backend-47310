import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'

import UserService from '../../services/user.services.js'
import CartService from '../../services/cart.services.js'

const userService = new UserService()
const cartService = new CartService()

const strategyOptions = {
  clientID: '604539075194-qhf3ak4juct25ec1ccbe73m0ok5rk0ra.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/oauth2/redirect/accounts.google.com',
  scope: ['profile', 'email'],
  state: true
}

const registerOrLogin = async (accesToken, _, profile, done) => {
  try {
    const user = await userService.findByEmail( profile._json.email )
    if (!user) {
      const newCart = await cartService.create()
      const newUser = {
        email: profile._json.email,
        first_name: profile._json.name || profile._json.login || 'noname',
        last_name: 'nolast',
        password: 'nopass',
      };
      const userCreated = await userService.registerUser({ ...newUser, cart: newCart })
      console.log('User Registration succesful')
      return done(null, userCreated)
    } else {
      console.log('User already exists')
      return done(null, user)
    }
  } catch (e) {
    console.log('Error en auth Google')
    console.log(e)
    return done(e)
  }
}

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  return done(null, id)
})