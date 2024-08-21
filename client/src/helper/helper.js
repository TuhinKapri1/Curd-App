import axios from "axios";
// const baseUrl = "https://curd-app-18dm.onrender.com/api/v1";
const baseUrl="http://localhost:3000/api/v1"
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
