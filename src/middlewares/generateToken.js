import jwt from 'jsonwebtoken'
import config from './../config/config.js'

export const generateToken = (user) => {
  const payload = {
    userID: user._id
  }
  const token = jwt.sign(payload, config.PRIVATE_KEY, { expiresIn: '20m' })
  return token
}