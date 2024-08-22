import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { productInfoValidation } from "../../../../validation/ProductInfoValidation";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Input from "../../../Input";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../../services/categoryServices";
import toast from "react-hot-toast";
import { createProduct } from "../../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setStep } from "../../../../redux/productSlice";

function ProductInfoForm() {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [img, setImg] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.messgae);
      dispatch(setProduct(data?.data))
      dispatch(setStep(2));
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
    resolver: yupResolver(productInfoValidation),
    mode: "onBlur",
  });

  const submitHandler = (data) => {
    if (!img) {
      return toast.error("Thumbnail is required");
    }
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("thumbnail", img);
    mutate(formData);
  };

  useEffect(() => {
    setValue("category", selectValue);
  }, [selectValue, setValue]);

  console.log(errors);
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
            label="name"
            control={control}
            name="name"
            error={errors.name ? errors.name : null}
            helperText={errors.name && errors.name.message}
          />

          <Input
            label="Description"
            control={control}
            name="description"
            error={errors.description ? errors.description : null}
            helperText={errors.description && errors.description.message}
          />
          <Stack
            direction="row"
            sx={{ width: 1 / 1, paddingBottom: 2 }}
            justifyContent="center"
          >
            <img
              src={img ? URL.createObjectURL(img) : ""}
              alt="Profile Picture"
              className="border rounded-md p-4"
              width={500}
              height={100}
            ></img>
          </Stack>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Thumbnail
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              hidden
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
          </Button>

          <FormControl fullWidth error={!!errors.category}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select Category"
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                    console.log(e.target);
                  }}
                  // value={"66c43a88e4631008aaa9439a"}
                >
                  {data?.data?.map((ele, index) => {
                    return (
                      <MenuItem key={index} value={ele._id}>
                        {ele?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>
          <Stack direction="row" justifyContent="end" sx={{ width: 1 / 1 }}>
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

export default ProductInfoForm;
