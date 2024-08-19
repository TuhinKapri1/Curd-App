import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../services/postServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["fetchAllPost"] });
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const submithandler = (data) => {
    mutate(data);
  };
  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(submithandler)}
          action=""
          className="flex border p-3 flex-col gap-5 "
        >
          <div>
            <label htmlFor="">Enter Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border  border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="">Enter Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="border  border-blue-600"
            />
          </div>
          <button>Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
