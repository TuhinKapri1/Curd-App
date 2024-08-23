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

export const updateProduct = async (data) => {
  try {
    const res = await axiosInstance.put(`/product/${data.id}`, data?.data);
    return res.data;
  } catch (err) {
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

export const updateProductVariant = async (data) => {
  try {
    const res = await axiosInstance.put(
      `/product/${data?.productId}/product-variant/${data?.productVariantId}`,
      data?.data
    );
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};



export const deleteProductVariant = async (data) => {
  try {
    const res = await axiosInstance.delete(
      `/product/${data?.productId}/product-variant/${data.productVariantId}`
    );
    return res?.data;
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

export const getSingleProduct = async (id) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
