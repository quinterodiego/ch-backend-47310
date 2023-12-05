import Router from 'express'
import * as controller from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.post('/', controller.create)

cartsRouter.get('/:cid', controller.getById)

cartsRouter.post('/:cid/product/:pid', controller.addProductById)

cartsRouter.put('/:cid/product/:pid', controller.updateProductQuantity)
cartsRouter.put('/:cid/products', controller.updateProductsArray)

cartsRouter.delete('/:cid/products/:pid', controller.deleteProduct)
cartsRouter.delete('/:cid', controller.deleteAllProducts)

export default cartsRouter