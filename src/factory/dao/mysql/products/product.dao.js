import MySqlDao from './../mysql.dao.js'
import { ProductModel } from './products.model.js'

export default class ProductDaoMySql extends MySqlDao {

  constructor() {
    super(ProductModel)
  }

}