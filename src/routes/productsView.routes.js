import Router from 'express';
import ProductController from '../controllers/products.controller.js'

export const productRouterView = Router()
const productController = new ProductController()

productRouterView.get('/', productController.getAllForView);