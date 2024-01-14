import 'dotenv/config'

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  PERSISTENCE: process.env.PERSISTENCE,
  PRIVATE_KEY: process.env.PRIVATE_KEY
}