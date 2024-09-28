import { Router } from "express";
import {
  addAddresses,
  getAddresses,
} from "../controllers/profile.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

export const profileRouter = Router();

profileRouter.route("/addAddresses").post(authValidation, addAddresses);
profileRouter.route("/getAddresses").get(authValidation, getAddresses);
