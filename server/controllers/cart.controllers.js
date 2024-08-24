import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.controllers.js";

class CartClass {
  updateCart = async (req, res) => {
    try {
      const { productId, price, quantity } = req.body;

      const { id } = req.user;

      const isExistProduct = await ProductModel.findOne({ _id: productId });
      if (!isExistProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const user = await UserModel.findOne({ _id: id });
      const cartItems = await CartModel.findOne({ _id: user.cart });

      const findCartIndex = cartItems.products.findIndex((ele) => {
        if (ele.productId.toString() === productId.toString()) {
          return ele.productId;
        }
      });
      console.log(productId);
      console.log(findCartIndex);
      if (findCartIndex === -1) {
        cartItems.products.push({
          productId,
          quantity,
        });
        // cartItems.totalQuantity = cartItems?.products?.length;
        // cartItems.totalPrice = price;
        await cartItems.save();
      } else {
        console.log(cartItems.products[findCartIndex]);
        cartItems.products[findCartIndex] = {
          productId: cartItems.products[findCartIndex]?.productId,
          quantity:
            parseInt(cartItems.products[findCartIndex].quantity) +
            parseInt(quantity),
        };
        // cartItems.totalQuantity = cartItems?.products?.length;
        // cartItems.totalPrice = cartItems.products.quantity * price;
        await cartItems.save();
      }

      res.status(200).json({
        success: true,
        message: "Add to cart successfully",
      });
    } catch (err) {
      console.log("Error happen in updateCart controllers", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export const cartControllers = new CartClass();
