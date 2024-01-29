import UserResDTO from "../factory/dto/users.res.dto.js"
import factory from "../factory/factory.js"

const { userDao } = factory

export default class UserRepository {
  constructor() {
    this.dao = userDao
  }

  async getUserById(id) {
    try {
      const resp = await this.dao.getById(id)
      return new UserResDTO(resp)
    } catch (error) {
      console.log(error)
    }
  }
}
