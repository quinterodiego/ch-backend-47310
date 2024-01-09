import Controller from './class.controller.js'
import ProductService from '../services/product.services.js'
const productService = new ProductService()

export default class ProductController extends Controller {
  constructor() {
    super(productService)
  }

  getAllWhitLimit =  async (req, res) => {
    const products = await productService.getAll()
    const { limit = 0 } = req.query
    console.log(limit)
    if(limit) {
      const productsLimit = products.splice(0, parseInt(limit))
      res.status(200).send({ 
        "status": "success",
        "payload": productsLimit 
      })
    } else {
      res.status(200).send(products)
    }
  }

  getAllForView = async (req, res) => {
    const { limit, page, sort, category, stock } = req.query
    const products = await productService.getAllForView(limit, page, sort, category, stock)
    const userData = {
      email: req.user.email,
      role: req.user.role
    }
    products.userData = userData
    res.status(200).render('products', products)
  }
}