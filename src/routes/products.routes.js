import Router from 'express'
import ProductController from '../controllers/products.controller.js'
import { isAdmin, isUser } from '../middlewares/auth.js'

const productsRouter = Router()
const productController = new ProductController()

productsRouter.get('/', productController.getAll)
productsRouter.get('/:pid', productController.getById)
productsRouter.get('/:limit', productController.getAllWhitLimit)
productsRouter.post('/', isAdmin, productController.create)
productsRouter.put('/:pid', isAdmin, productController.update)
productsRouter.delete('/:pid', isAdmin, productController.delete)

export default productsRouter