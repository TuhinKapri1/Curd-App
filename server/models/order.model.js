import mongoose from "mongoose";

const orderSchmea = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      totalQuantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  //   transectionId: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
});

const OrderModel = mongoose.model("Order", orderSchmea);

export { OrderModel };
