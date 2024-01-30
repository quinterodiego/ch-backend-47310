import Controller from './class.controller.js'
import ProductService from '../services/product.services.js'
const productService = new ProductService()

export default class ProductViewController extends Controller {
  constructor() {
    super(productService)
  }
  
  getAllForView =  async (req, res) => {
    const { limit, page, sort, category, stock } = req.query
    const products = await productService.getAllForView(limit, page, sort, category, stock)
    console.log(req.user)
    const userData = {
      firstname: req.session.first_name,
      email: req.session.email,
      role: req.session.role
    }
    products.userData = userData
    res.status(200).render('products', products)
  }
}