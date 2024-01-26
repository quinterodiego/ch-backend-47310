import MySqlDao from './../mysql.dao.js'
import { CartModel } from './carts.model.js'

export default class CartDaoMySql extends MySqlDao {

  constructor() {
    super(CartModel)
  }

}