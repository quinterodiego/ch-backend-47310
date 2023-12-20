import { createHash, isValidPassword } from '../../utils.js'
import { UserModel } from './models/users.model.js'

export default class UserDaoMongoDB {

  async findByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email })
      if(userExist) return userExist
      else return false 
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getById(id) {
    try {
      const userExist = await UserModel.findOne({ _id: id })
      if(userExist) return userExist
      else return false 
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async registerUser(user) {
    try {
      const { email, password } = user
      const existUser = await this.findByEmail(email)
      if(!existUser) {
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
          return await UserModel.create(
            { 
              ...user, 
              password: createHash(password), 
              role: 'admin' 
            }
          )
        }
        return await UserModel.create({ ...user, password: createHash(password) })
      } else return false
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user
      const userExist = await UserModel.findOne({ email })
      if(userExist) {
        const isValidPass = isValidPassword(password, userExist)
        if(!isValidPass) return false
        else return userExist
      } else return false
    } catch (error) {
      console.log(error)
    }
  }

}