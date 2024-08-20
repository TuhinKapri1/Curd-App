import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      default: "Draft",
      enum: ["Draft", "Public"],
    },
    productVarients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productvarient",
      },
    ],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
