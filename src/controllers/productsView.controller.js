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
    const userData = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      role: req.user.role
    }
    console.log(req.session)
    products.userData = userData
    res.status(200).render('products', products)
  }
}