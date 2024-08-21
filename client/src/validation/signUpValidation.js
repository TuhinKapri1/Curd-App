import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  // profilePicture: yup
  //   .mixed()
  //   .required("Profile picture is required")
  //   .test(
  //     "fileSize",
  //     "File size is too large",
  //     (value) => !value || (value && value.size <= 2000000)
  //   ), // 2MB
});
