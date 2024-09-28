import { Router } from "express";
import {
  getProducts,
  getProductsByName,
  getProductsByCategory,
  checkProductStock,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.route("/getProducts").get(getProducts);
productRouter.route("/getProductsByName").get(getProductsByName);
productRouter.route("/getProductsByCategory").get(getProductsByCategory);
productRouter.route("/checkProductStock").post(checkProductStock);
