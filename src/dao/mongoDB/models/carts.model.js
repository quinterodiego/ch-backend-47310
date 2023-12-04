import { Schema, model } from 'mongoose'

const schema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

schema.pre("find", function () {
  this.populate("products.product");
});

export const CartModel = model('carts', schema)