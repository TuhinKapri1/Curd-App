import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import Input from "../components/Input";
import { Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { signInSchema } from "../validation/signInValidation";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/profileSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      navigate("/");
      dispatch(setToken(data?.token));
      dispatch(setUser(data?.data));
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
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
  });
  const submitHandler = (data) => {
    console.log(data);

    mutate(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
        }}
      >
        <form action="" onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
            SignIn
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
}

export default SignIn;
