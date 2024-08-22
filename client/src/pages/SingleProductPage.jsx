import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../helper/helper";
import { getSingleProduct } from "../services/productServices";

function SingleProductPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchSingle"],
    queryFn: () => {
      return getSingleProduct(id);
    },
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return <div>SingleProductPage</div>;
}

export default SingleProductPage;
