import Router from 'express'
import * as controller from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.post('/', controller.create)

cartsRouter.get('/:cid', controller.getById)

cartsRouter.put('/:cid/product/:pid', controller.addProductByIdInCart)

export default cartsRouter