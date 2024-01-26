import { Schema, model } from 'mongoose'

const schema = new Schema({
    user: { type: String, require: true, max: 100 },
    message: { type: String, require: false, max: 500 }
})

export const MessagesModel = model('messages', schema)