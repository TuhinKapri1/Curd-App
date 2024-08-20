import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.controllers.js";

class CartClass {
  updateCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
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
      console.log(cartItems.products);
      const findCartIndex = cartItems.products.findIndex((ele) => {
        console.log(ele.productId);
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
        await cartItems.save();
      } else {
        console.log(cartItems.products[findCartIndex]);
        cartItems.products[findCartIndex] =
         {...cartItems.products[findCartIndex],quantity: parseInt(cartItems.products[findCartIndex].quantity) +
            parseInt(quantity)}
        await cartItems.save();
      }

      res.status(200).json({
        success:true,
        message:"Add to cart successfully"
      })
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
