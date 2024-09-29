import { Schema, model } from "mongoose";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

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

const addressSchema = Schema({
  name: {
    type: String,
    required: [true, "Name should be provided"],
  },
  addressLineOne: {
    type: String,
    required: true,
  },
  addressLineTwo: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
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
      type: [orderProducts],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
