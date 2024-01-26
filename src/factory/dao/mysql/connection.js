import 'dotenv/config'
import {Sequelize} from 'sequelize'

const db = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USR, process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

export const initMySqlDB = async () => {
  try {
    await db.sync({ force: false })
    console.log('Conectado a la base de datos MySQL!')
  } catch (error) {
    console.log(error)
  }
}

export default db  