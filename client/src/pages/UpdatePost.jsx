import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../services/postServices";
import FormPage from "../components/FormPage";
import toast from "react-hot-toast";

function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery({
    queryKey: ["fetchSingle"],
    queryFn: () => getSinglePost(id),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["fetchAllPost"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  const submithandler = async (data) => {
    mutate({ data: data, id: id });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-[22px] font-semibold mt-10 mb-4 ">
          Update Your post
        </div>
        <FormPage
          isUpdate={true}
          data={data}
          submithandler={submithandler}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default UpdatePost;
