import { Schema, model } from 'mongoose'

const schema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true, default: Date.now() },
  amount: { type: Number, required: true, default: 0 },
  purchaser: { type: String, required: true }
})

export const TicketModel = model('tickets', schema)