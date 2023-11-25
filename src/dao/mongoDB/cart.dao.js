import { CartModel } from './models/carts.model.js'

export default class CartDaoMongoDB {

  async getById(id) {
    try {
      const resp = await CartModel.findById(id)
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async create() {
    try {
      const products = []
      const resp = await CartModel.create({ products })
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async addProductByIdInCart(id, idProduct, quantity) {
    try {
      const cart = await CartModel.findOne({_id: id})
      const oldProducts = cart.products
      const productExists = oldProducts.find(product => product.id.toString() === idProduct)
      if(productExists) {
        const index = oldProducts.findIndex(product => product.id.toString() === idProduct)
        oldProducts[index].quantity += quantity
      } else {
        oldProducts.push({ id: idProduct, quantity })
      }
      const resp = await CartModel.updateOne({ _id: id}, {$set: {products: oldProducts}})
      return resp
    } catch (error) {
      console.log(error)
    }
  }

}