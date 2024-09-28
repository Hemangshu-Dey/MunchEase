import { Router } from "express";
import { makePayment } from "../controllers/payment.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

export const paymentRouter = Router();

paymentRouter.route("/makePayment").post(authValidation, makePayment);
