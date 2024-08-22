import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Controller, useController, useForm } from "react-hook-form";
import Input from "../../../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { productVariantValidation } from "../../../../validation/productVariantInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../../redux/productSlice";
import { useMutation } from "@tanstack/react-query";
import { createProductVariant } from "../../../../services/productServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProductVariantForm() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { product } = useSelector((state) => state.product);
  console.log(product);
  const [selectSizeValue, setSelectSizeValue] = useState(null);
  const [selectColorValue, setSelectColorValue] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createProductVariant,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      navigate('/dashboard/my-product')
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productVariantValidation),
    mode: "onBlur",
  });

  const { field } = useController({
    name: "size",
    control,
    rules: { required: true },
  });

  const submitHandler = (data) => {
    console.log(data);
    mutate({ data: data, productId: product?._id });
  };

  console.log(errors);

  const size = ["S", "M", "L", "XL"];
  const color = ["Black", "White", "Red", "Blue"];

  useEffect(() => {
    setValue("color", selectColorValue);
    setValue("size", selectSizeValue);
  }, [selectSizeValue, selectColorValue]);

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
        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ mt: 0 }}
        >
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

          <FormControl fullWidth error={!!errors.size}>
            <InputLabel id="demo-simple-select-label">Select size</InputLabel>

            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select size"
                  onChange={(e) => {
                    setSelectSizeValue(e.target.value);
                    console.log(e.target);
                  }}
                  // value={"66c43a88e4631008aaa9439a"}
                >
                  {size?.map((ele, index) => {
                    return (
                      <MenuItem key={index} value={ele}>
                        {ele}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>
          <FormControl sx={{ marginTop: 2 }} fullWidth error={!!errors.color}>
            <InputLabel id="demo-simple-select-label">Select color</InputLabel>

            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select Category"
                  onChange={(e) => {
                    setSelectColorValue(e.target.value);
                    console.log(e.target);
                  }}
                  // value={"66c43a88e4631008aaa9439a"}
                >
                  {color?.map((ele, index) => {
                    return (
                      <MenuItem key={index} value={ele}>
                        {ele}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: 1 / 1 }}
          >
            <Button
              type="button"
              fullWidth
              loading={false}
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, width: 100 }}
              onClick={() => {
                dispatch(setStep(1));
              }}
            >
              Back
            </Button>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isPending}
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, width: 100 }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default ProductVariantForm;
