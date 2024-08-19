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
          className="bg-blue-600 mx-auto text-[13px] px-5 font-semibold text-white w-80 py-2 rounded-md"
        >
          Create post
        </Link>
      </div>
      <div className="flex mt-5 flex-wrap gap-5  ">
        {data?.data?.map((ele, index) => (
          <Link
            to={`/${ele?._id}`}
            key={index}
            className="flex w-[280px] p-4 flex-col gap-4 border border-blue-300 rounded-md"
          >
            <div className="flex gap-1">
              <p>
                Title :
              </p>
              <p>{ele?.title}</p>
            </div>
            <div className="flex gap-1">
              <p>
                Description :
              </p>
              <p>{ele?.description}</p>
            </div>
           
            
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
