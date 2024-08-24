import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      console.log(payload);
      state.cartItems.push({
        data: payload?.data,
        totalPrice: payload?.data?.productVarients[0]?.price,
        totalQuantity: 1,
      });
    },
    setCartValue: (state, { payload }) => {
      state.cartItems = payload;
    },
    productRemoveFromCart: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.data._id === payload
      );
      console.log(index);
      if (index > -1) {
        state.cartItems.splice(index, 1);
      }
    },

    incrementCartItem: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.data._id === payload?._id
      );
      let arr = state.cartItems.map((ele) => {
        if (ele.data._id === payload._id) {
          if (ele.totalQuantity === 5) {
            return ele;
          }
          ele.totalQuantity += 1;
          ele.totalPrice += ele.data.productVarients[0].price;
        }
        return ele;
      });
      state.cartItems = arr;
      console.log(index);
    },
    decrementCartItem: (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.data._id === payload._id
      );
      let arr = state.cartItems.map((ele) => {
        if (ele.data._id === payload._id) {
          if (ele.totalQuantity === 1) {
            return ele;
          } else {
            ele.totalQuantity -= 1;
            ele.totalPrice -= ele.data.productVarients[0].price;
          }
        }
        return ele;
      });
      state.cartItems = arr;
      console.log(index);
    },
  },
});

export const {
  addToCart,
  productRemoveFromCart,
  decrementCartItem,
  incrementCartItem,
  setCartValue
} = cartSlice.actions;

export default cartSlice.reducer;
