import Controller from './class.controller.js'
import ProductService from '../services/product.services.js'
import { generateProducts } from '../utils.js'

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
}