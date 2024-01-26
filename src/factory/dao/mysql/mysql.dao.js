export default class MySqlDao {
  constructor(model) {
    this.model = model
  }

  async create(obj) {
    try {
      const response = await this.model.create(obj)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll()
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findOne({ where: { id: id }})
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      await this.model.update(obj, { where: { id: id }})
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.destroy({ where: { id: id }})
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}