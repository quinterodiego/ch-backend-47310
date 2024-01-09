import Services from './class.services.js'
import CartDaoMongoDB from './../dao/mongoDB/carts/cart.dao.js'
const cartDao = new CartDaoMongoDB()

export default class CartService extends Services {
  constructor() {
    super(cartDao)
  }

  create = async () => {
    try {
      const products = []
      const newCart = await cartDao.create({products})
      if(!newCart) return false
      else return newCart
    } catch (error) {
      console.log(error)
    }
  }
  
  updateProductQuantity = async (idCart, idProduct, quantity) => {
    try {
      const cartUpdated = await cartDao.updateProductQuantity(idCart, idProduct, quantity)
      if(!cartUpdated) return false
      else return cartUpdated
    } catch (error) {
      console.log(error)
    }
  }
  
  updateProductsArray = async (idCart, products) => {
    try {
      const cartUpdated = await cartDao.updateProductsArray(idCart, products)
      if(!cartUpdated) return false
      else return cartUpdated
    } catch (error) {
      console.log(error)
    }
  }
  
  deleteProduct = async (idCart, idProduct) => {
    try {
      const cartUpdated = await cartDao.deleteProduct(idCart, idProduct)
      if(!cartUpdated) return false
      else return cartUpdated
    } catch (error) {
      console.log(error)
    }
  }
  
  deleteAllProducts = async (idCart) => {
    try {
      const cartUpdated = await cartDao.deleteAllProducts(idCart)
      if(!cartUpdated) return false
      else return cartUpdated
    } catch (error) {
      console.log(error)
    }
  }
}