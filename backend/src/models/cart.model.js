import { Schema, model } from "mongoose";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

const cartProducts = Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: Product,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    products: {
      type: [cartProducts],
    },
  },
  { timestamps: true }
);

export const Cart = model("Cart", cartSchema);
