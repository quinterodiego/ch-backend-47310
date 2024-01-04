import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'

import UserDaoMongoDB from '../../dao/mongoDB/user.dao.js'

const userDaoMongoDB = new UserDaoMongoDB()

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY,
}

const verifyToken = async(jwt_payload, done) => {
  console.log('payload => ', jwt_payload)
  const user = await userDaoMongoDB.getById(jwt_payload.userID)
  console.log(jwt_payload)
  if(!user) return done(null, false)
  return done(null, jwt_payload)
}

const cookieExtractor = (req) => {
  const token = req.cookies.token
  return token
}

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.PRIVATE_KEY
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