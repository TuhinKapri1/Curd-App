import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getSinglePost } from "../services/postServices";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { data, isLoading } = useQuery({
    queryKey: ["fetchSinglePost"],
    queryFn: () => {
      return getSinglePost(id);
    },
  });
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  console.log(data);
  const deleteHandler = async () => {
    try {
      const res = await deletePost(id);
      console.log(res);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="border p-4 border-blue-400">
        <p>{data?.data?.title}</p>
        <p>{data?.data?.description}</p>
      </div>
      <div className="flex mt-4 gap-4 ">
        <Link
          to={`/update-post/${data?.data?._id}`}
          className="px-4 py-2 border border-blue-500 rounded-md"
        >
          Update Post
        </Link>
        <button
          onClick={deleteHandler}
          className="px-4 py-2 border border-blue-500 rounded-md"
        >
          Deleted Post
        </button>
      </div>
    </div>
  );
}

export default SinglePost;
