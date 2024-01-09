import ProductService from '../services/product.services.js'
const productService = new ProductService()

export const getAllProducts =  async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const products = await productService.getAllForView(limit, page, sort, category, stock)
  console.log(req.session)
  const userData = {
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    email: req.session.email,
    role: req.session.role
  }
  console.log(req.session)
  products.userData = userData
  res.status(200).render('products', products)
}