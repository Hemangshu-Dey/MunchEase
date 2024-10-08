import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//configurations
app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use("/static", express.static("public"));
app.use(cookieParser());

//routes
import { authRouter } from "./routes/auth.route.js";
import { productRouter } from "./routes/product.route.js";
import { profileRouter } from "./routes/profile.route.js";
import { cartRouter } from "./routes/cart.route.js";
import { paymentRouter } from "./routes/payment.route.js";
import { tokenRouter } from "./routes/newAccessToken.routes.js";
import { orderRouter } from "./routes/order.route.js";

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/profile", profileRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/token", tokenRouter);

export { app };
