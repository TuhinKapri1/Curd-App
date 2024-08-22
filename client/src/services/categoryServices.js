import { axiosInstance } from "../helper/helper";

export const getAllCategory = async () => {
  try {
    const res = await axiosInstance.get("/category");
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
