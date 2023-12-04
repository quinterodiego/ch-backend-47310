import Router from 'express'
import * as controller from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.post('/', controller.create)

cartsRouter.get('/:cid', controller.getById)

cartsRouter.put('/:cid/product/:pid', controller.addProductByIdInCart)
cartsRouter.put('/:cid/products/:pid', controller.updateProductsArray)

cartsRouter.delete('/:cid/products/:pid', controller.deleteProduct)
cartsRouter.delete('/:cid', controller.deleteAllProducts)

export default cartsRouter