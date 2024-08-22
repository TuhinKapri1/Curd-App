import * as yup from "yup";

export const productVariantValidation = yup.object().shape({
  color: yup.string().required("Color is required"),
  size: yup.string().required("Size is required"),
  price: yup.number().required("Price is required"),
  quantity: yup.number().required("Quantity is required"),
});
