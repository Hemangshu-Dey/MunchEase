import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { response } from "../utils/response.util.js";

const createOrder = async (req, res) => {
  const { products, transactionId, address, totalAmount } = req.body;

  if (!products || !products.length) {
    return response(res, 400, "Cart is empty", null, "");
  }

  if (!transactionId || !address.name || !totalAmount)
    return response(res, 400, "Missing fields received", null, "");

  const userid = new mongoose.Types.ObjectId(req.user.id);

  try {
    const orderProducts = [];
    const productsToUpdate = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return response(
          res,
          402,
          `Product with id ${item.productId} not found`,
          null,
          ""
        );
      }

      if (product.stock < item.quantity) {
        return response(
          res,
          402,
          `Insufficient stock for product ${product.name} (ID: ${product._id}). Available: ${product.stock}, Requested: ${item.quantity}`,
          null,
          ""
        );
      }

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
      });

      productsToUpdate.push({
        product,
        quantity: item.quantity,
      });
    }

    for (let { product, quantity } of productsToUpdate) {
      product.stock -= quantity;
      await product.save();
    }

    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const orderId = `ORD-${timestamp}-${randomNum}`;

    const newOrder = new Order({
      userid,
      products: orderProducts,
      totalAmount,
      transactionId,
      orderId,
      address,
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ userid }, { $set: { products: [] } });

    return response(res, 200, "Order created successfully", { orderId }, "");
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return response(res, 400, "Invalid data", null, error.message);
    }
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

const getOrders = async (req, res) => {
  const userid = new mongoose.Types.ObjectId(req.user.id);
  try {
    const orders = await Order.find({ userid: userid });

    if (orders)
      return response(res, 200, "Orders fetched successfully", { orders }, "");

    return response(
      res,
      200,
      "Orders fetched successfully",
      { orders: [] },
      ""
    );
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return response(res, 400, "Invalid data", null, error.message);
    }
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

export { createOrder, getOrders };
