import axios from "axios";
// const baseUrl = "https://curd-app-18dm.onrender.com/api/v1";
const baseUrl = "http://localhost:3000/api/v1";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = JSON.parse(token);
      return config;
    }

    return config;
  },
  (err) => {
    return err;
  }
);



export const getImageFromBackend=(image)=>{
  return `${baseUrl}/uploads/${image}`
}