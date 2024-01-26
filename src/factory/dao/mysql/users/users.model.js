import { db } from './../connection.js'
import { DataTypes } from 'sequelize'

export const UserModel = db.dfine('users', {
  first_name: { type: DataTypes.STRING, allowNull: true },
  last_name:  { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true , unique: true },
  age: { type: DataTypes.INTEGER, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  cart: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false }
})  