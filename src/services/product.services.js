import ProductDaoMongoDB from './../dao/mongoDB/product.dao.js'
import { ProductModel } from "../dao/mongoDB/models/products.model.js";
const productDao = new ProductDaoMongoDB()

// import { ProductDaoFilesystem } from './../dao/fileSystem/product.dao.js'
// const productFileSystem = new ProductDaoFilesystem('../dao/fileSystem/data/products.json')

export const getAll = async (limit, page, sort, category, stock) => {

  const filters = {
    page: page || 1,
    limit: limit || 10,
    sort: sort || ''
  }

  let query = {}
  category ? query.category = category : null
  stock ? query.stock = { $gt: stock} : null
  const resp = await productDao.getAll(query, filters)
  const paramLimit = limit ? `&limit=${limit}` : ''
  const paramSort = sort ? `&sort=${sort}` : ''
  const paramCategory = category ? `&category=${category}` : ''
  const paramStock = stock ? `&stock=${stock}` : ''

  const prevParams = new URLSearchParams(`${paramLimit}&page=${resp.prevPage}${paramSort}${paramCategory}${paramStock}`)
  const nextParams = new URLSearchParams(`${paramLimit}&page=${resp.nextPage}${paramSort}${paramCategory}${paramStock}`)

  resp.prevLink = resp.prevPage ? `?${prevParams}` : null
  resp.nextLink = resp.nextPage ? `?${nextParams}` : null

  const payload = resp.docs.map((item) => {
    return {
        _id: item._id, 
        title: item.title,
        description: item.description,
        category: item.category,
        thumbnail: item.thumbnail[0],
        price: item.price,
        code: item.code,
        stock: item.stock,
        status: item.status
    };
  });
  const { docs, ...rest } = resp;
  console.log('REST => ', rest)

  return { 
      status: 'success', 
      payload, 
      totalPages: rest.totalPages,
      prevPage: rest.prevPage,
      nextPage: rest.nextPage,
      page: rest.page,
      hasPrevPage: rest.hasPrevPage,
      hasNextPage: rest.hasNextPage,
      prevLink: rest.prevLink,
      nextLink: rest.nextLink
    }
}

export const getById = async (id) => {
  try {
    const product = await productDao.getById(id)
    if(!product) return false
    else return product
  } catch (error) {
    console.log(error)
  }
}

export const create = async (product) => {
  try {
    const newProduct = await productDao.create(product)
    if(!newProduct) return false
    else return newProduct
  } catch (error) {
    console.log(error)
  }
}

export const updateById = async (id, product) => {
  try {
    const productUpdated = await productDao.update(id, product)
    if(!productUpdated) return false
    else return productUpdated
  } catch (error) {
    console.log(error)
  }
}

export const deleteById = async (id) => {
  try {
    const productDeleted = await productDao.delete(id)
    if(!productDeleted) return false
    else return productDeleted
  } catch (error) {
    console.log(error)
  }
}