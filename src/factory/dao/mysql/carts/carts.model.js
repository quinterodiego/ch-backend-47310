import { db } from './../connection.js'
import { DataTypes } from 'sequelize'

export const CartModel = db.define('carts', {
  product: { type: DataTypes.ARRAY, allowNulls: false },
  quantity: { type: DataTypes.INTEGER, defallowNullsault: false }
})