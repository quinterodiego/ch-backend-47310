import { CartModel } from './models/carts.model.js'

export default class CartDaoMongoDB {

    create = async () => {
        const products = []
        const resp = await CartModel.create({products})
        return resp
    }

    getById = async (id) => {
        const resp = await CartModel.findById(id).populate('products.product')
        return resp
    }

    addProductById = async (idCart, idProduct) => {
      const cart = await CartModel.findById(idCart)
      const exist = cart.products.find(prod => prod.product.toString() === idProduct)
      let resp = ''
      if(!exist) {
          cart.products.push({ product: idProduct, quantity: 1 })
          resp = await cart.save()
          return resp
      } else {
        const oldProducts = cart.products
        const index = oldProducts.findIndex(product => product.product.toString() === idProduct)
        oldProducts[index].quantity++
        resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })
        return resp
      }
    }

    updateProductQuantity = async (idCart, idProduct, quantity) => {
      const cart = await CartModel.findOne({_id: idCart})
      const exist = cart.products.find(prod => prod.product.toString() === idProduct)
      let resp = ''
      if(!exist) {
        resp = 'El producto que intenta actualizar no existe en el carrito'
        return resp
      } else {
        const oldProducts = cart.products
        const index = oldProducts.findIndex(product => product.product.toString() === idProduct)
        oldProducts[index].quantity += quantity
        resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })
        return resp
      }
    }

    updateProductsArray = async (idCart, products) => {
      const resp = await CartModel.findByIdAndUpdate(idCart, { products: products}, { new: true })
      return resp
    }

    deleteProduct = async (idCart, idProduct) => {
      const cart = await CartModel.findById(idCart)
      const exist = cart.products.find(prod => prod.product.toString() === idProduct)
      let resp = ''
      if(!exist) {
          resp = 'El producto que intenta borrar no existe en el carrito'
          return resp
      } else {
          const oldProducts = cart.products
          const newProducts = oldProducts.filter( prod => prod.product.toString() !== idProduct)
          resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })
          return resp
      }
    }

    deleteAllProducts = async (idCart) => {
        const resp = await CartModel.findByIdAndUpdate(idCart, { products: []}, { new: true })
        return resp
    }
}