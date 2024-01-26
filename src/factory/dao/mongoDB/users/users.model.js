import { Schema, model } from 'mongoose';

const schema = new Schema({
    first_name: { type: String, max: 100, default: '' },
    last_name: { type: String, max: 100, default: '' },
    email: { type: String, required: true, unique: true, default: '' },
    age: { type: Number, max: 100, default: 0 },
    password: { type: String, max: 100 },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: 'user' }
});

export const UserModel = model('users', schema);