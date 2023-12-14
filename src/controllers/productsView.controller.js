import { getAll } from '../services/product.services.js'

export const getAllProducts =  async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const products = await getAll(limit, page, sort, category, stock)
  const userData = {
    firstname: req.session.user.firstname,
    lastname: req.session.user.lastname,
    email: req.session.user.email,
    role: req.session.user.role
  }
  console.log(req.session)
  products.userData = userData
  res.status(200).render('products', products)
}