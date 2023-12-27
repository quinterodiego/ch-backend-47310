import Router from 'express'
import * as controller from '../controllers/messages.controller.js'

const messagesRouter = Router()

messagesRouter.get('/', controller.getAll)

messagesRouter.post('/', controller.create)

export default messagesRouter