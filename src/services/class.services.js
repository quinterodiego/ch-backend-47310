export default class Services { 
  constructor(dao) {
    this.dao = dao
  }

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj)
      return !newItem ? false : newItem
    } catch (error) {
      console.log(error)
    }
  }

  getAll = async () => {
    try {
      return await this.dao.getAll() 
    } catch (error) {
      console.log(error)
    }
  }

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id)
      return !item ? false : item
    } catch (error) {
      console.log(error)
    }
  }

  update = async (id, obj) => {
    try {
      return await this.dao.update(id, obj)
    } catch (error) {
      console.log(error)
    }
  }

  delete = async (id) => {
    try {
      return await this.dao.delete(id)
    } catch (error) {
      console.log(error)
    }
  }
}