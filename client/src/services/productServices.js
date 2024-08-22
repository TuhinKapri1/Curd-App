import axios from "axios";
import { axiosInstance } from "../helper/helper";

export const createProduct = async (data) => {
  try {
    const res = await axiosInstance.post("/product", data);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const createProductVariant = async (data) => {
  try {
    const res = await axiosInstance.post(
      `/product/${data?.productId}/product-variant`,
      data?.data
    );

    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserProduct = async () => {
  try {
    const res = await axiosInstance.get("/product/user-product");
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};


export const getSingleProduct=async(id)=>{
  try {
    const res = await axiosInstance.get(`/product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
