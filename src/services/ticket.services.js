import { uuid } from 'uuidv4'

import factory from '../factory/factory.js'
import { getById as getProductById } from './product.services.js'
import { getById as getCartById } from './cart.services.js'
import { getById as getUserById } from './user.services.js'

const { ticketDao } = factory

export const generateTicket = async (userId, cartId) => {
  try {
    const user = await getUserById(userId)
    if(!user) return false

    const cart = await getCartById(cartId)
    if(!cart) return false

    let amountAcc = 0
    for (const prod of cart.products) {
      const idProd = p.product._id-tostring()
      const product = await getProductById(idProd)

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
