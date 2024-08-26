import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  product: null,
  productVariant: [],
  isUpdate: false,
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
      // localStorage.setItem("product", JSON.stringify(payload));
    },
    setUpadte: (state, { payload }) => {
      state.isUpdate = payload;
    },
    setProductVariant: (state, { payload }) => {
      state.productVariant = payload;
      localStorage.setItem("productVariant", JSON.stringify(payload));
    },
  },
});

export default productSlice.reducer;
export const { setStep, setProduct, setUpadte, setProductVariant } =
  productSlice.actions;
