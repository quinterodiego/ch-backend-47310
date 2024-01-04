import { Schema, model } from 'mongoose';

const schema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: 'user' }
});

export const UserModel = model('users', schema);