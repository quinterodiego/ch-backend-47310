import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../jwt/auth.js'
import UserDaoMongoDB from '../dao/mongoDB/user.dao.js'

const userDaoMongoDB = new UserDaoMongoDB()

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization')
    if(!authHeader) res.status(401).json({ message: 'Unauthorized' })
    const token = authHeader.split(' ')[1]
    const decode = jwt.verify(token, PRIVATE_KEY)
    console.log('decode => ', decode)
    const user = await userDaoMongoDB.getById(decode.userID)
    if(!user) res.status(401).json({ message: 'User not exists' })
    req.user = user
    next()
  } catch (error) {
    console.log(error)
  }
}