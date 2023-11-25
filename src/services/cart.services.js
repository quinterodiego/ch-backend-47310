import CartDaoMongoDB from './../dao/mongoDB/cart.dao.js'
const cartDao = new CartDaoMongoDB()

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id)
    if(!cart) return false
    else return cart
  } catch (error) {
    console.log(error)
  }
}

export const create = async () => {
  try {
    const newCart = await cartDao.create()
    if(!newCart) return false
    else return newCart
  } catch (error) {
    console.log(error)
  }
}

export const addProductByIdInCart = async (id, product, quantity) => {
  try {
    const cartUpdated = await cartDao.addProductByIdInCart(id, product, quantity)
    if(!cartUpdated) return false
    else return cartUpdated
  } catch (error) {
    console.log(error)
  }
}