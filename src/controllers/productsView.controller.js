import { getAll } from '../services/product.services.js'

export const getAllProducts =  async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const resp = await getAll(limit, page, sort, category, stock)
  res.status(200).render('products', resp)
}