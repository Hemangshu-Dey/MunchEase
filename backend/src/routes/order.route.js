import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

export const orderRouter = Router();

orderRouter.route("/createOrder").post(authValidation, createOrder);
orderRouter.route("/getOrders").post(authValidation, getOrders);
