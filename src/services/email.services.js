import 'dotenv/config'
import { createTransport } from 'nodemailer'

// export const transporter = createTransport({
//   host: process.env.HOST_ETHEREAL,
//   port: process.env.PORT_ETHEREAL,
//   auth: {
//       user: process.env.USER_ETHEREAL,
//       pass: process.env.PASSWORD_ETHEREAL
//   }
// })

// export const mailOptions = {
//   from: process.env.USER_ETHEREAL,
//   to: process.env.USER_ETHEREAL,
//   subject: 'Bienvenida',
//   text: 'Bienvenido al envío de mail através de NODEMAILER'
// }

export const transporter = createTransport({
  service: 'gmail',
  port: process.env.PORT_GMAIL,
  secure: true,
  auth: {
      user: process.env.EMAIL_GMAIL,
      pass: process.env.PASSWORD_GMAIL
  }
})