import { getAll } from '../services/product.services.js'

export const getAllProducts =  async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const products = await getAll(limit, page, sort, category, stock)
  const userData = {
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    email: req.session.email,
    role: req.session.role
  }
  products.userData = userData
  res.status(200).render('products', products)
}