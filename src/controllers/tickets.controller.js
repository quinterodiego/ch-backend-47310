import * as ticketService from '../services/ticket.services.js'

export const generateTicket = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { cartId } = req.params
    const ticket = await ticketService.generateTicket(_id, cartId)
    if(!ticket) res.status(404).json({ message: 'Error generate ticket' })
    else res.status(200).json(ticket)
  } catch (error) {
    networkInterfaces(error.message)
  }
}