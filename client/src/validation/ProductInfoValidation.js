import { Category } from "@mui/icons-material";
import * as yup from "yup";

export const productInfoValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});
