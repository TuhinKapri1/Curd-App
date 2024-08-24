import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/order.controllers.js";
import { isAuth } from "../middleware/auth.js";
const OrderRouter = express.Router();

OrderRouter.post("/create-order", isAuth, createOrder);

OrderRouter.post("/verify-order", isAuth, verifyPayment);

export { OrderRouter };
