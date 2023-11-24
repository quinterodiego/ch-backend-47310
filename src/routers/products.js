import Router from 'express'
import * as controller from './../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.get('/', controller.getAll)

productsRouter.get('/:pid', controller.getById)

productsRouter.post('/', controller.create)

productsRouter.put('/:pid', controller.updateById)

productsRouter.delete('/:pid', controller.deleteById)

export default productsRouter