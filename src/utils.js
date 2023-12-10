/* PATH DIRNAME */
import {fileURLToPath} from 'url'
import {dirname} from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default __dirname


/* BCRYPT HASHEO */
import bcrypt, { hashSync, genSaltSync, compareSync } from 'bcrypt'

/* Registro */
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10))
}

/* Login */
// export const isValidPassword = (user, password) = {
//   compareSync(password, user.password)
// }