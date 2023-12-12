import UserDaoMongoDB from '../dao/mongoDB/user.dao.js'
const userDaoMongoDB = new UserDaoMongoDB()

export default class UserService {

  async findByEmail(email) {
    try {
      const user = await userDaoMongoDB.findByEmail(email)
      if(!user) return false
      else return user
    } catch (error) {
      console.log(error)
    }
  }

  async registerUser(user) {
    try {
      const userRegisted = await userDaoMongoDB.registerUser(user)
      if(!userRegisted) return false
      else return userRegisted
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const user = await userDaoMongoDB.getById(id)
      if (!user) return false
      else return user
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(user) {
    try {
      const userLogged = await userDaoMongoDB.loginUser(user)
      if (!userLogged) return false
      else return userLogged
    } catch (error) {
      console.log(error)
    }
  }

}