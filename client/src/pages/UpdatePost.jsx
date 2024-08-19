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
      <div className="flex flex-col justify-center items-center">
        <div className="text-[22px] font-semibold mt-10 mb-4 ">
          Update Your post
        </div>
        <form
          onSubmit={handleSubmit(submithandler)}
          action=""
          className="flex border w-[400px] p-3 flex-col gap-5 "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[12px] font-semibold  ">
              Enter Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border px-3 text-[13px]  border-gray-400 rounded focus:border-0  py-2"
              defaultValue={data ? data?.data?.title : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[12px] font-semibold  ">
              Enter Description
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="border px-3 text-[13px]  border-gray-400 rounded focus:border-0  py-2"
              defaultValue={data ? data?.data?.description : ""}
            />
          </div>
          <button className="bg-blue-600 mx-auto text-[13px] font-semibold text-white w-40 py-2 rounded-md">
            {false ? <>Loading ....</> : <> UpdatePost </>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
