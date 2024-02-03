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
  console.log(password, user.password)
  return compareSync(password, user.password)
}


// CREATE RESPONSE
export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

// FAKER
import { fakerES as faker } from '@faker-js/faker'

export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
    price: faker.commerce.price(),
    code: faker.string.hexadecimal(),
    stock: faker.number.int(100),
    category: faker.string.fromCharacters('abc', 10),
    status: faker.datatype.boolean(0.9)
  }
}