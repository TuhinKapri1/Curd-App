import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useController, useForm } from "react-hook-form";
import Input from "../../../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { productVariantValidation } from "../../../../validation/productVariantInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setStep, setUpadte } from "../../../../redux/productSlice";
import { useMutation } from "@tanstack/react-query";
import {
  createProductVariant,
  updateProductVariant,
} from "../../../../services/productServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RHFSelect from "../../../form/RHFSelect";

function ProductVariantForm({ handleClose, isEdit, editData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.product);

  const { mutate: createMutate, isPending: isCreatePending } = useMutation({
    mutationFn: createProductVariant,
    onSuccess: (data) => {
      toast.success(data?.message);
      const arr = [...product?.productVarients, data?.data];
      dispatch(setProduct({ ...product, productVarients: arr }));
      handleClose();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const { isPending: isUpdatePending, mutate: updateMutate } = useMutation({
    mutationFn: updateProductVariant,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      const arr = [...product?.productVarients];
      const index = arr.findIndex((variant) => variant._id === editData?._id);
      arr[index] = data?.data;
      dispatch(setProduct({ ...product, productVarients: arr }));
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(productVariantValidation),
    mode: "onBlur",
  });

  const submitHandler = (data) => {
    if (isEdit) {
      return updateMutate({
        data: data,
        productId: product?._id,
        productVariantId: editData._id,
      });
    }
    createMutate({ data: data, productId: product?._id });
  };

  console.log(errors);

  const size = ["S", "M", "L", "XL"];
  const color = ["Black", "White", "Red", "Blue"];

  useEffect(() => {
    reset({
      color: editData?.color,
      size: editData?.size,
      price: editData?.price,
      quantity: editData?.quantity,
    });
  }, [isEdit, editData]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 0,
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ mt: 0, width: "400px", gap: 2 }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ gap: 3 }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginLeft: 2 }}
            >
              {isEdit ? (
                <>Update Product variant</>
              ) : (
                <>Create Product variant</>
              )}
            </Typography>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon color="balck" />
            </Button>
          </Stack>
          <Input
            label="price"
            control={control}
            name="price"
            error={errors.price ? errors.price : null}
            helperText={errors.price && errors.price.message}
          />
          <Input
            label="quantity"
            control={control}
            name="quantity"
            error={errors.quantity ? errors.quantity : null}
            helperText={errors.quantity && errors.quantity.message}
          />

          <RHFSelect
            label="Select Size"
            name="size"
            control={control}
            error={!!errors?.size}
            helperText={errors.size?.message}
          >
            {size?.map((ele, index) => {
              return (
                <MenuItem key={index} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </RHFSelect>

          <RHFSelect
            label="Select color"
            name="color"
            control={control}
            error={!!errors?.color}
            helperText={errors.color?.message}
          >
            {color?.map((ele, index) => {
              return (
                <MenuItem key={index} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </RHFSelect>

          <Stack direction="row" justifyContent="end" sx={{ width: 1 / 1 }}>
            <Stack direction="row" sx={{ gap: 1 }}>
              <LoadingButton
                type="button"
                onClick={() => {
                  handleClose();
                }}
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, width: 100 }}
              >
                Cancel
              </LoadingButton>
              {isEdit ? (
                <>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={isUpdatePending}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, width: 100 }}
                  >
                    Update
                  </LoadingButton>
                </>
              ) : (
                <>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={isCreatePending}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, width: 100 }}
                  >
                    Save
                  </LoadingButton>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default ProductVariantForm;
