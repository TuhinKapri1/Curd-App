import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
