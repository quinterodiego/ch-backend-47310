import MongoDBDao from '../mongodb.dao.js'
import { ProductModel } from './products.model.js'

export default class ProductDaoMongoDB extends MongoDBDao {
  constructor() {
    super( ProductModel )
  }

  async getAll(query, filters){
    try {
      const products = await ProductModel.paginate(query, filters)
      return products
    } catch (error) {
      console.log(error)
    }
  }


  async update(id, product) {
    try {
      const resp = await ProductModel.findByIdAndUpdate(id, product, {
        new: true,
      })
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {
      const resp = await ProductModel.findByIdAndDelete(id)
      return resp
    } catch (error) {
      console.log(error)
    }
  }
}