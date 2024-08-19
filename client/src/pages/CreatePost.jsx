import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../services/postServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FormPage from "../components/FormPage";
import toast from "react-hot-toast";
function CreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data?.message);
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
        <FormPage submithandler={submithandler} isPending={isPending} />
      </div>
    </div>
  );
}

export default CreatePost;
