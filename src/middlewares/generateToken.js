import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const payload = {
    userID: user._id
  }
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '20m' })
  return token
}