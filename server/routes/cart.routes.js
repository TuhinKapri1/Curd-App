import express from "express";
import { cartControllers } from "../controllers/cart.controllers.js";
import { isAuth } from "../middleware/auth.js";
const CartRouter = express.Router();

CartRouter.put("/", isAuth, cartControllers.updateCart);

export { CartRouter };
