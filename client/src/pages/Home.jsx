import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getAllPost } from "../services/postServices";

function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchAllPost"],
    queryFn: getAllPost,
  });
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  console.log(data);
  return (
    <div className="flex flex-col p-5">
      <div>
        <Link
          to="/create-post"
          className="border rounded-md px-3 py-2 border-blue-400"
        >
          Create post
        </Link>
      </div>
      <div className="flex mt-5 flex-wrap gap-5  ">
        {data?.data?.map((ele, index) => (
          <Link
            to={`/${ele?._id}`}
            key={index}
            className="flex p-4 flex-col gap-4 border border-blue-300 rounded-md"
          >
            <p>{ele?.title}</p>
            <p>{ele?.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
