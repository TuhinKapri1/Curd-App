import { axiosInstance } from "../helper/helper";

export const createPost = async (data) => {
  try {
    const res = await axiosInstance.post("/post", data);
    return res?.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllPost = async () => {
  try {
    const res = await axiosInstance.get("/post");
    return res?.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const getSinglePost = async (id) => {
  try {
    const res = await axiosInstance.get(`/post/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const updatePost = async (data) => {
  try {
    const res = await axiosInstance.put(`/post/${data?.id}`, data?.data);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePost = async (id) => {
  try {
    const res = await axiosInstance.delete(`/post/${id}`);
    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
