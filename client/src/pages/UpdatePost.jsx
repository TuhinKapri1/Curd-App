import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../services/postServices";
import { useForm } from "react-hook-form";

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["fetchSingle"],
    queryFn: () => getSinglePost(id),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("title", data?.data?.title);
    setValue("description", data?.data?.description);
  }, [data]);
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  const submithandler = async (data) => {
    try {
      const res = await updatePost({ data: data, id: id });
      console.log(res);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <div>
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
              defaultValue={data ? data?.data?.title : ""}
            />
          </div>
          <div>
            <label htmlFor="">Enter Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="border  border-blue-600"
              defaultValue={data ? data?.data?.description : ""}
            />
          </div>
          <button>{false ? <>Loading ....</> : <> UpdatePost </>}</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
