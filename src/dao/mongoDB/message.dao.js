import { MessagesModel } from './models/messages.model.js'

export default class MessageDaoMongoDB {

  async getAll(){
    try {
      const messages = await MessagesModel.find()
      return messages
    } catch (error) {
      console.log(error)
    }
  }

  async create(message) {
    try {
      const resp = await MessagesModel.create(message)
      return resp
    } catch (error) {
      console.log(error)
    }
  }
}