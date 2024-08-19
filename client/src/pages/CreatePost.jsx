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
      <div className="flex flex-col mt-6 justify-center items-center">
        <div className="text-[18px] font-semibold ">Create post</div>
        <form
          onSubmit={handleSubmit(submithandler)}
          action=""
          className="flex mt-5 border  rounded-md w-[400px] p-3 flex-col gap-5 "
        >
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-[12px] font-semibold  ">
              Enter Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border  border-gray-400 rounded py-1"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-[12px] font-semibold  ">
              Enter Description
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="border  border-gray-400 rounded focus:border-0  py-1"
            />
          </div>
          <button className="bg-blue-600 mx-auto text-[13px] font-semibold text-white w-40 py-2 rounded-md">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
