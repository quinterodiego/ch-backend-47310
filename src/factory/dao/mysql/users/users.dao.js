import 'dotenv/config'
import jwt from 'jsonwebtoken'
import MySqlDao from './../mysql.dao.js'
import { UserModel } from './users.model.js'
import { createHash, isValidPassword } from '../../../../utils.js'

const PRIVATE_KEY = process.env.PRIVATE_KEY

export default class UsersDaoMySql extends MySqlDao {

  constructor() {
    super(UserModel)
  }

  #generateToken(user) {
    const payload = {
      userId: user.id
    }
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '20m' })
  }

  async register(user) {
    try {
      const { email, password } = user
      const existsUser = await getByEmail(email)
      if(!existsUser) {
        const newUser = await this.model.create({
          ...user,
          password: createHash(password)
        })
        const token = this.#generateToken(newUser)
        return token
      }
      else return false
    } catch (error) {
      console.log(error)
    }
  }

  async login(user) {
    try {
      const { email, password } = user
      const existsUser = await getByEmail(email)
      if(existsUser) {
        const passValid = isValidPassword(password, existsUser)
        if(!passValid) return false
        else {
          return this.#generateToken(existsUser)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getByEmail(email) {
    try {
      const existsUser = await this.model.findOne({ where: { email: email }})
      if(!existsUser) return
      else return existsUser
    } catch (error) {
      console.log(error)
    }
  }
}