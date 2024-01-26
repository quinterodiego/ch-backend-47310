import ProductDaoFilesystem from './dao/fileSystem/products/product.dao.js'
import CartDaoFilesystem from './dao/fileSystem/carts/cart.dao.js'
import UserDaoFilesystem from './dao/fileSystem/users/user.dao.js'

import ProductDaoMongoDB from './dao/mongoDB/products/product.dao.js'
import CartDaoMongoDB from './dao/mongoDB/carts/cart.dao.js'
import UserDaoMongoDB from './dao/mongoDB/users/user.dao.js'
import config from '../config/config.js'
import connectMongoDB from '../config/connectionDB/connection.js'

import ProductDaoMySql from './dao/mysql/products/product.dao.js'
import CartDaoMySql from './dao/mysql/carts/carts.dao.js'
import UsersDaoMySql from './dao/mysql/users/users.dao.js'
import { initMySqlDB } from './dao/mysql/connection.js'

let productDao
let cartDao
let userDao
const persistence = config.PERSISTENCE

switch (persistence) {
  case 'fs':
    productDao = new ProductDaoFilesystem('./fileSystem/products/products.json')
    cartDao = new CartDaoFilesystem('./fileSystem/carts/carts.json')
    userDao = new UserDaoFilesystem('./fileSystem/users/users.json')
    break;

  case 'mongodb':
    await connectMongoDB()
    productDao = new ProductDaoMongoDB()
    cartDao = new CartDaoMongoDB()
    userDao = new UserDaoMongoDB()
    break;

  case 'mysql':
    await initMySqlDB()
    productDao = new ProductDaoMySql()
    cartDao = new CartDaoMySql()
    userDao = new UsersDaoMySql()
    break;

  default:
    productDao = new ProductDaoFilesystem('./fileSystem/products/products.json')
    cartDao = new CartDaoFilesystem('./fileSystem/carts/carts.json')
    userDao = new UserDaoFilesystem('./fileSystem/users/users.json')
    break;
}

export default { productDao, cartDao, userDao }