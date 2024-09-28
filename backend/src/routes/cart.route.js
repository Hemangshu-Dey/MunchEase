import { Router } from "express";
import {
  addToCart,
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
} from "../controllers/cart.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

export const cartRouter = Router();

cartRouter.route("/addToCart").post(authValidation, addToCart);
cartRouter.route("/removeFromCart").post(authValidation, removeOneFromCart);
cartRouter.route("/clearCart").get(authValidation, clearCart);
cartRouter.route("/removeAllFromCart").post(authValidation, removeAllFromCart);
