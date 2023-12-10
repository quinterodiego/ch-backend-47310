import { UserModel } from "../dao/mongoDB/models/users.model"

export default class UserService {

  async findByEmail(email) {
    return await UserModel.findOne({ email })
  }

  async register(user) {
    try {
      const { email } = user
      const exists = await this.findByEmail(email)
      if (!exists) await UserModel.create(user)
      else return false
    } catch (error) {
      console.log(error)
    }
  }

  async login(user) {
    try {
      const { email, password } = user
      const userExists = await UserModel.findOne({ email, password })
      if (!userExists) return false
      else return userExists
    } catch (error) {
      console.log(error)
    }
  }

}