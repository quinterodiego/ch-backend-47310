import { UserModel } from './models/users.model.js'

export default class UserDaoMongoDB {

  async findByEmail(email) {
    return await UserModel.findOne({ email })
  }

  async registerUser(user) {
    try {
      const { email, password } = user
      const existUser = await this.findByEmail(email)
      if(!existUser) {
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
          return await UserModel.create({ ...user, role: 'admin' })
        }
        return await UserModel.create(user)
      } else return false
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(user) {
    const { email, password } = user
    try {
      const userExists = await UserModel.findOne({ email, password })
      if (!userExists) return false
      else return userExists
    } catch (error) {
      console.log(error)
    }
  }

}