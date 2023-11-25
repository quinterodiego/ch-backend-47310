import * as service from './../services/message.services.js'

export const getAll =  async (_, res) => {
  const messages = await service.getAll()
  if(messages) {
    res.status(200).send({
      "status": "success",
      "payload": messages
    })
  } else {
    res.status(404).send({ error: 'Error al buscar mensajes'})
  }
}

export const create = async (req, res) => {
  const message = req.body
  const newMessage = await service.create(message)
  if(newMessage) {
    res.status(200).send({
      "status": "success",
      "payload": newMessage
    })
  } else {
    res.status(404).send({ error: 'Error al crear el mensaje'})
  }
}