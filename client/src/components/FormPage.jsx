import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormPage({ isUpdate, isPending = false, data, submithandler }) {
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
  }, [isUpdate, data]);

  return (
    <div>
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
          <div>
            {errors?.title && (
              <div className="text-[12px] text-red-400 font-semibold ">
                Title is required
              </div>
            )}
          </div>
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
          <div>
            {errors?.description && (
              <div className="text-[12px] text-red-400 font-semibold ">
                Description is required
              </div>
            )}
          </div>
        </div>
        <button
          disabled={isPending}
          className="bg-blue-600 mx-auto text-[13px] font-semibold text-white w-40 py-2 rounded-md"
        >
          {false ? (
            <>Loading ....</>
          ) : (
            <> {isUpdate ? "Update Post" : "Create Post"} </>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPage;
