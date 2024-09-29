import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { response } from "../utils/response.util.js";

const addToCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) return response(res, 400, "Product Id is required", null, "");

  const proId = new mongoose.Types.ObjectId(productId);

  const userid = req.user.id;
  const id = new mongoose.Types.ObjectId(userid);

  try {
    let cart = await Cart.findOne({ userid: id });

    if (!cart) {
      cart = {
        userid: id,
        products: [
          {
            productId: proId,
            quantity: 1,
          },
        ],
      };

      await Cart.create(cart);
    } else {
      let flag = true;
      cart.products.forEach((product) => {
        if (product.productId.equals(proId)) {
          product.quantity++;
          flag = false;
        }
      });

      if (flag) {
        cart.products.push({
          productId: proId,
          quantity: 1,
        });
      }
      await cart.save();
    }

    return response(res, 200, "Product added successfully", null, "");
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return response(res, 400, "Invalid data", null, error.message);
    }
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

const removeOneFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) return response(res, 400, "Product Id is required", null, "");

  const proId = new mongoose.Types.ObjectId(productId);
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const cart = await Cart.findOne({ userid: userId });

    if (!cart) {
      return response(res, 404, "Cart not found", null, "");
    }

    const productIndex = cart.products.findIndex((product) =>
      product.productId.equals(proId)
    );

    if (productIndex === -1) {
      return response(res, 404, "Product not found in cart", null, "");
    }

    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();

    return response(res, 200, "Product removed successfully", null, "");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

const removeAllFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) return response(res, 400, "Product Id is required", null, "");

  const proId = new mongoose.Types.ObjectId(productId);
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const cart = await Cart.findOne({ userid: userId });

    if (!cart) {
      return response(res, 404, "Cart not found", null, "");
    }

    const initialProductCount = cart.products.length;

    cart.products = cart.products.filter(
      (product) => !product.productId.equals(proId)
    );

    if (cart.products.length === initialProductCount) {
      return response(res, 404, "Product not found in cart", null, "");
    }

    await cart.save();

    return response(res, 200, "Product removed completely from cart", null, "");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

const clearCart = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const cart = await Cart.findOne({ userid: userId });

    if (!cart) {
      return response(res, 404, "Cart not found", null, "");
    }

    cart.products = [];

    await cart.save();

    return response(res, 200, "Cart cleared successfully", null, "");
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return response(res, 400, "Invalid data", null, error.message);
    }
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

const getCart = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.user.id);

  try {
    const cart = await Cart.findOne({ userid: id });

    if (!cart)
      return response(
        res,
        200,
        "Cart fetched successfully",
        { products: [] },
        ""
      );

    return response(res, 200, "Cart fetched successfully", cart.products, "");
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return response(res, 400, "Invalid data", null, error.message);
    }
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

export { addToCart, removeOneFromCart, removeAllFromCart, clearCart, getCart };
