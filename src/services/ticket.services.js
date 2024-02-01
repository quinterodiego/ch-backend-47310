import { uuid } from 'uuidv4'

import factory from '../factory/factory.js'
import CartService from '../services/cart.services.js'
import ProductService from '../services/product.services.js'
import UserService from '../services/user.services.js'

const cartService = new CartService()
const productService = new ProductService()
const userService = new UserService()
const { ticketDao } = factory

export default class TicketService {

  generateTicket = async (userId, cartId) => {
    try {
      const user = await userService.getUserById(userId)
      if(!user) return false
  
      const cart = await cartService.getCartById(cartId)
      if(!cart) return false
  
      let amountAcc = 0
      for (const prod of cart.products) {
        const idProd = p.product._id-tostring()
        const product = await productService.getProductById(idProd)
  
        if(p.quantity <= product.stock) {
          const amount = p.quantity * product.price
          amountAcc += amount
        }
      }
  
      const ticket = await ticketDao.create({
        code: uuid(),
        amount: amountAcc,
        purchaser: user.email
      })
  
      cart.products = []
      cart.save()
  
      return ticket
    } catch (error) {
      throw new Error(error)
    }
  }

} 
