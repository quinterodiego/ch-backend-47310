import MongoDBDao from '../mongodb.dao.js'
import { ProductModel } from './products.model.js'

export default class ProductDaoMongoDB extends MongoDBDao {
  constructor() {
    super( ProductModel )
  }

  async getAllWithQueryAndFilters(query, filters){
    try {
      const products = await ProductModel.paginate(query, filters)
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }
}