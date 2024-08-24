import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem("token", JSON.stringify(payload));
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    logout: (state, { payload }) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, logout } = profileSlice.actions;

export default profileSlice.reducer;
