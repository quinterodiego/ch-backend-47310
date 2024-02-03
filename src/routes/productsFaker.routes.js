import Router from 'express'
import ProductFakerController from '../controllers/productsFaker.controller.js'

const productsFakerRouter = Router()
const productFakerController = new ProductFakerController()

productsFakerRouter.get('/', productFakerController.getFakerProducts)

export default productsFakerRouter