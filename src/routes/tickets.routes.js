import Router from 'express'
import * as controller from '../controllers/tickets.controller.js'

const ticketsRouter = Router()

ticketsRouter.post('/cart/:cartId', controller.generateTicket)

export default productsRouter