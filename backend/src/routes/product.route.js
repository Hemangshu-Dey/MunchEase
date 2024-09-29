import { Router } from "express";
import {
  getProducts,
  checkProductStock,
  getProductById,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.route("/getProducts").get(getProducts);
productRouter.route("/getProductById").get(getProductById);
productRouter.route("/checkProductStock").post(checkProductStock);
