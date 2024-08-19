import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getSinglePost } from "../services/postServices";
import toast from "react-hot-toast";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchSinglePost"],
    queryFn: () => {
      return getSinglePost(id);
    },
  });
  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      
      toast.success(data.message);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  const deleteHandler = () => {
    mutate(id);
  };
  return (
    <div className="flex gap-4 justify-center flex-col items-center mt-16">
      <div className="text-[19px] font-semibold">Your Post</div>
      <div className="flex  w-[280px] p-4 flex-col gap-4 border border-blue-300 rounded-md">
        <div className="flex gap-3">
          <p>Title:</p>
          <p>{data?.data?.title}</p>
        </div>
        <div className="flex gap-3">
          <p>Description:</p>
          <p>{data?.data?.description}</p>
        </div>
      </div>
      <div className="flex mt-4 gap-4 ">
        <Link
          to={`/update-post/${data?.data?._id}`}
          className="bg-blue-600 mx-auto text-[13px] font-semibold text-white px-5 py-2 rounded-md"
        >
          Update Post
        </Link>
        <button
          onClick={deleteHandler}
          className="bg-red-600 mx-auto text-[13px] font-semibold px-5 text-white  py-2 rounded-md"
        >
          Deleted Post
        </button>
      </div>
    </div>
  );
}

export default SinglePost;
