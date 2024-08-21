import { axiosInstance } from "../helper/helper";

export const signUp = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/sign-up", data);
    return res?.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export const signIn = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/sign-in", data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
