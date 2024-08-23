import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProduct } from "../../services/productServices";
import ProductCard from "../product/ProductCard";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
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
        return (
          <>
            <Stack sx={{ width: "300px" }}>
              <ProductCard key={index} data={ele} />
              <Link
                className="border w-20 px-3 py-2"
                to={`/dashbaord/edit-product/${ele?._id}`}
              >
                Edit
              </Link>
            </Stack>
          </>
        );
      })}
    </div>
  );
}

export default MyProduct;
