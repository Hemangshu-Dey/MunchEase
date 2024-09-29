import { Router } from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.route("/getProducts").get(getProducts);
productRouter.route("/getProductById").get(getProductById);
