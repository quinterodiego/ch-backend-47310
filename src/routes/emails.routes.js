import { Router } from "express"
import { sendMailEthereal } from "../controllers/email.controller.js"

const emailRouter = Router()

emailRouter.post('/', sendMailEthereal)

export default emailRouter