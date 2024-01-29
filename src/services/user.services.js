import Services from './class.services.js'
import factory from '../factory/factory.js'
import UserRepository from '../repository/user.repository.js'

const { userDao } = factory
const userRepository = new UserRepository()

export default class UserService extends Services {
  constructor() {
    super(userDao)
  }

  async findByEmail(email) {
    try {
      const user = await userDao.findByEmail(email)
      if(!user) return false
      else return user
    } catch (error) {
      console.log(error)
    }
  }

  async registerUser(user) {
    try {
      const userRegisted = await userDao.registerUser(user)
      console.log('userRegisted', userRegisted)
      if(!userRegisted) return false
      else return userRegisted
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(user) {
    try {
      const userLogged = await userDao.loginUser(user)
      if (!userLogged) return false
      else return userLogged
    } catch (error) {
      console.log(error)
    }
  }

  async getUserByIdDTO(id) {
    try {
      const user = await userRepository.getUserById(id)
      if (!user) return false
      else return user
    } catch (error) {
      console.log(error)
    }
  }
}