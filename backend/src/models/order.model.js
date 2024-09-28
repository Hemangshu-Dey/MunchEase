import { Schema, model } from "mongoose";

const orderProducts = Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: Product,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    products: {
      type: [cartProducts],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
