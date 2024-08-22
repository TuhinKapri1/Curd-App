import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProduct } from "../../services/productServices";
import ProductCard from "../product/ProductCard";
function MyProduct() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUserProduct"],
    queryFn: getUserProduct,
  });

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  console.log(data);
  return (
    <div className="p-4 flex gap-4 flex-wrap">
      {data?.data?.map((ele, index) => {
        return <ProductCard key={index} data={ele} />;
      })}
    </div>
  );
}

export default MyProduct;
