import { ProductModel } from './models/products.model.js'

export default class ProductDaoMongoDB {

  async getAll(query, filters){
    try {
      const products = await ProductModel.paginate(query, filters)
      return products
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const resp = await ProductModel.findById(id)
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async create(product) {
    try {
      const resp = await ProductModel.create(product)
      return resp
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