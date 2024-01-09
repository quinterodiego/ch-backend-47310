/* PATH DIRNAME */
import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
export default __dirname


/* MONGO STORE OPTIONS */
import MongoStore from 'connect-mongo'
export const mongoStoreOptions = {
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://d86webs:Diego859@cluster0.htbts60.mongodb.net/ecommerce', ttl: 3600 }),
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true
}


/* BCRYPT HASHEO */
import bcrypt, { hashSync, genSaltSync, compareSync } from 'bcrypt'

  /* Registro */
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10))
}

  /* Login */
export const isValidPassword = (password, user) => {
  return compareSync(password, user.password)
}


// CREATE RESPONSE
export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};