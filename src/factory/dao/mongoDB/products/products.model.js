import { Schema, model } from 'mongoose'
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    thumbnail: { type: [String], required: false },
    price: { type: Number, required: true },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    status: { type: Boolean, required: true, },
})

schema.plugin(monsoosePaginate);

export const ProductModel = model('products', schema);