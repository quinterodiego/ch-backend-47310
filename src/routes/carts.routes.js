import Router from 'express'
import CartController from '../controllers/carts.controller.js'
import TicketController from '../controllers/tickets.controller.js'

const cartsRouter = Router()
const cartController = new CartController()
const ticketController = new TicketController()

cartsRouter.get('/:cid', cartController.getById)

cartsRouter.post('/', cartController.create)
cartsRouter.post('/:cid/product/:pid', cartController.addProductById)
cartsRouter.post('/:cid/purchase', ticketController.generateTicket)

cartsRouter.put('/:cid/product/:pid', cartController.updateProductQuantity)
cartsRouter.put('/:cid/products', cartController.updateProductsArray)

cartsRouter.delete('/:cid/products/:pid', cartController.deleteProduct)
cartsRouter.delete('/:cid', cartController.deleteAllProducts)

export default cartsRouter