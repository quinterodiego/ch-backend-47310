import Router from 'express';
import ProductController from '../controllers/products.controller.js'
import CartController from '../controllers/carts.controller.js'

export const router = Router()
const productController = new ProductController()
const cartController = new CartController()

router.get('/products', productController.getAllForView)

router.get('/cart/:cid', async (req, res) => {
  const resp = await cartController.getById(req.params.cid)
  const resp2 = {
      payload: resp
  }
  res.status(200).render('cart', resp2)
});