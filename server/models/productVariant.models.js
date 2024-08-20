import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
  },
  color: {
    type: String,
    enum: ["Black", "White", "Red", "Blue"],
  },
  price: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
  },
});

export const ProductVarientModel = mongoose.model(
  "Productvarient",
  productVariantSchema
);
