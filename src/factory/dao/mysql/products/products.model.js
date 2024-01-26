import { db } from './../connection.js'
import { DataTypes } from 'sequelize'

export const ProductModel = db.define('products', {
  title: { type: DataTypes.STRING},
  description: { type: DataTypes.STRING},
  thumbnail: { type: DataTypes.ARRAY},
  price: { type: DataTypes.INTEGER },
  code: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN }
})