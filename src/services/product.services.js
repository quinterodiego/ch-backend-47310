import { ProductDaoMongoDB } from './../dao/mongoDB/product.dao'
const productDao = new ProductDaoMongoDB()

export const getAll = async () => {
  try {
    const products = await productDao.getAll()
    return products
  } catch (error) {
    console.log(error)
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