import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "../helper/helper";
import ProductCard from "../components/product/ProductCard";

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () => {
      const res = await axiosInstance.get("/product");
      return res?.data;
    },
  });

  if (isLoading) {
    return <div>Laoding .....</div>;
  }

  console.log(data);

  return (
    <div className="">
      {data?.data?.map((ele, index) => {
        return <ProductCard key={index} data={ele} />;
      })}
    </div>
  );
}

export default Home;
