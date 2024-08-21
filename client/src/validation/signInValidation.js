import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
