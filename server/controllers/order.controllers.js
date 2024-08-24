import Razorpay from "razorpay";
import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";
import { OrderModel } from "../models/order.model.js";
export const createOrder = async (req, res) => {
  try {
    // const { products, amount } = req.body;
    const { products } = req.body;

    const totalPrice = [...JSON.parse(products)].reduce(
      (acc, res) => acc + parseInt(res.totalPrice),
      0
    );

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      notes: {
        userId: req.user._id,
        products: products,
      },
    };
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.status(200).json({
      success: true,
      products: products,
      orderId: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log("Error happen in createOrder", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
      req.body;
    const { products } = req.body;
    console.log(JSON.parse(products));

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "OYTNe1APKRym84JsnFZVfKtH")
      .update(body.toString())
      .digest("hex");
    if (razorpay_signature == expectedSignature) {
      console.log("true");
      const orderedProduct = [...JSON.parse(products)].map((ele, index) => {
        return {
          productId: ele?.data?._id,
          totalPrice: ele?.totalPrice,
          totalQuantity: ele?.totalQuantity,
        };
      });
      console.log(orderedProduct);

      const isExist = await OrderModel.findOne({ userId: req.user.id });
      if (isExist) {
        isExist.orderItems.push(...orderedProduct);
        await isExist.save();
      } else {
        const or = await OrderModel.create({
          userId: req.user.id,
          orderItems: orderedProduct,
        });
      }
    }
    res.status(200).json({
      success: true,
      messgae: "Payment successfull",
    });
  } catch (err) {
    console.log("Error happen in verifyPayment ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
