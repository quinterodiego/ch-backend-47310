import { getAll } from '../services/product.services.js'

export const getAllProducts =  async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const products = await getAll(limit, page, sort, category, stock)
  console.log(req.user)
  const userData = {
    email: req.user.email,
    role: req.user.role
  }
  products.userData = userData
  res.status(200).render('products', products)
}