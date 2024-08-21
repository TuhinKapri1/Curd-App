import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { UploadFile } from "@mui/icons-material";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signUp } from "../services/authServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation/signUpValidation";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate=useNavigate()
  const { isPending, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message)
      navigate('/sign-in')
    },
    onError: (err) => {
      console.log(err);

      if (err?.response?.data?.success === false) {
        toast.error(err?.response?.data?.message);
      }
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
  });

  console.log(errors);
  const [img, setImg] = useState(null);

  const submitHandler = (data) => {
    if (!img) {
      return toast.error("Profile Picture is need");
    }
    console.log(data);
    console.log(img);
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("profilePicture", img);

    mutate(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <form action="" onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Stack
              direction="row"
              sx={{ width: 1 / 1 }}
              justifyContent="center"
            >
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                src={img ? URL.createObjectURL(img) : ""}
                alt="Profile Picture"
              >
                <UploadFile />
              </Avatar>
            </Stack>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Profile Picture
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

            <Input
              label="name"
              control={control}
              name="name"
              error={errors.name ? errors.name : null}
              helperText={errors.name && errors.name.message}
            />
            <Input
              label="email"
              control={control}
              name="email"
              error={errors.email ? errors.email : null}
              helperText={errors.email && errors.email.message}
            />
            <Input
              label="password"
              control={control}
              name="password"
              type="password"
              error={errors.password ? errors.password : null}
              helperText={errors.password && errors.password.message}
            />
          </Box>
          <LoadingButton
            type="submit"
            fullWidth
            loading={isPending}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
