import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'

import config from './../config.js'
import UserDaoMongoDB from '../../persistence/dao/mongoDB/users/user.dao.js'

const userDaoMongoDB = new UserDaoMongoDB()

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.PRIVATE_KEY,
}

const verifyToken = async(jwt_payload, done) => {
  const user = await userDaoMongoDB.getById(jwt_payload.userID)
  if(!user) return done(null, false)
  return done(null, jwt_payload)
}

const cookieExtractor = (req) => {
  console.log('cookieExtractor')
  const token = req.cookies.token
  return token
}

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: config.PRIVATE_KEY
}

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken))
passport.use('jwtCookie', new jwtStrategy(strategyOptionsCookies, verifyToken))

passport.serializeUser((user, done) => {
  done(null, user.userID)
})

passport.deserializeUser(async (id, done) => {
  const user = await userDaoMongoDB.getById(id)
  return done(null, user)
})