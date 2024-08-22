import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 2,
  product: null,
};

const productSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      localStorage.setItem("product", JSON.stringify(payload));
    },
  },
});

export default productSlice.reducer;
export const { setStep, setProduct } = productSlice.actions;
