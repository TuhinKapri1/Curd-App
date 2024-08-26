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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategory } from "../../../../services/categoryServices";
import toast from "react-hot-toast";
import {
  createProduct,
  updateProduct,
} from "../../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setStep, setUpadte } from "../../../../redux/productSlice";
import RHFSelect from "../../../form/RHFSelect";
import { getImageFromBackend } from "../../../../helper/helper";
import { DevTool } from "@hookform/devtools";
function ProductInfoForm() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { product, isUpdate } = useSelector((state) => state.product);
  console.log(product, isUpdate);
  const [img, setImg] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  const { isPending: crateIsPending, mutate: crateMutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.messgae);
      dispatch(setProduct(data?.data));
      dispatch(setStep(2));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { isPending: updateIsPending, mutate: updateMutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setProduct(data?.data));
      dispatch(setStep(2));
      queryClient.invalidateQueries({ queryKey: ["fetchUserProduct"] });
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
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(productInfoValidation),
    mode: "onBlur",
  });

  const submitHandler = (value) => {
    console.log(value);
    const formData = new FormData();
    if (!isUpdate) {
      if (!img) {
        return toast.error("Thumbnail is required");
      }

      formData.append("name", data?.name);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("thumbnail", img);

      return crateMutate(formData);
    }

    console.log(img);

    formData.append("name", value?.name);
    formData.append("description", value?.description);
    formData.append("category", value?.category);
    if (img) {
      formData.append("thumbnail", img);
    }

    updateMutate({ id: product?._id, data: formData });
  };

  if (isUpdate && product) {
    setValue("category", product?.category?._id);
  }

  useEffect(() => {
    console.log("I am update mode");
    if (isUpdate) {
      setValue("name", product?.name);
      setValue("description", product?.description);
      setValue("category", product?.category?._id);
      setValue("image", product?.thumbnail);
    }
  }, []);

  console.log(getImageFromBackend(getValues()?.image));
  console.log(getValues());

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
            <>
              {isUpdate ? (
                <>
                  <img
                    width={500}
                    height={100}
                    className="border rounded-md p-4"
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : getImageFromBackend(product && product?.thumbnail)
                    }
                    alt="asefwerg3"
                  />
                </>
              ) : (
                <>
                  <img
                    src={img ? URL.createObjectURL(img) : ""}
                    alt="Thumbnail"
                    className="border rounded-md p-4"
                    width={500}
                    height={100}
                  ></img>
                </>
              )}
            </>

            {/* {isUpdate ? (
              img ? (
                <img
                  src={img ? URL.createObjectURL(img) : ""}
                  alt="Thumbnail"
                  className="border rounded-md p-4"
                  width={500}
                  height={100}
                ></img>
              ) : (
                <img
                  src={getImageFromBackend(getValues()?.image)}
                  alt="Thumbnail"
                  className="border rounded-md p-4"
                  width={500}
                  height={100}
                ></img>
              )
            ) : (
              <></>
              // <img
              //   src={img ? URL.createObjectURL(img) : ""}
              //   alt="Thumbnail"
              //   className="border rounded-md p-4"
              //   width={500}
              //   height={100}
              // ></img>
            )} */}
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
                setValue("image", null);
              }}
            />
          </Button>

          <RHFSelect
            name="category"
            control={control}
            label="Select Category"
            error={!!errors?.category}
            helperText={errors?.category?.message}
          >
            {data?.data?.map((ele, index) => {
              return (
                <MenuItem key={index} value={ele?._id}>
                  {ele?.name}
                </MenuItem>
              );
            })}
          </RHFSelect>

          <Stack direction="row" justifyContent="end" sx={{ width: 1 / 1 }}>
            {isUpdate ? (
              <>
                <Stack direction="row" sx={{ gap: 2 }}>
                  <LoadingButton
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, width: 200 }}
                    onClick={() => {
                      dispatch(setStep(2));
                      setUpadte(false);
                    }}
                  >
                    Without Save
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={updateIsPending}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, width: 100 }}
                  >
                    update
                  </LoadingButton>
                </Stack>
              </>
            ) : (
              <LoadingButton
                type="submit"
                fullWidth
                loading={crateIsPending}
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, width: 100 }}
              >
                Save
              </LoadingButton>
            )}
          </Stack>
        </Box>
        <DevTool control={control} />
      </Box>
    </div>
  );
}

export default ProductInfoForm;
