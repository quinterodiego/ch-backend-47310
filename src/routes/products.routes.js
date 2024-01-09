import Router from 'express'
import ProductController from '../controllers/products.controller.js'

const productsRouter = Router()
const productController = new ProductController()

productsRouter.get('/', productController.getAll)
productsRouter.get('/:pid', productController.getById)
productsRouter.get('/:limit', productController.getAllWhitLimit)
productsRouter.post('/', productController.create)
productsRouter.put('/:pid', productController.update)
productsRouter.delete('/:pid', productController.delete)

export default productsRouter