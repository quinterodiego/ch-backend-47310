import MessageDaoMongoDB from './../dao/mongoDB/message.dao.js'
const messageDao = new MessageDaoMongoDB()

export const getAll = async () => {
  try {
    const messages = await messageDao.getAll()
    return messages
  } catch (error) {
    console.log(error)
  }
}

export const create = async (message) => {
  try {
    const newMessage = await messageDao.create(message)
    if(!newMessage) return false
    else return newMessage
  } catch (error) {
    console.log(error)
  }
}