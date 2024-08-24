import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance, getImageFromBackend } from "../../helper/helper";
import { Link } from "react-router-dom";

function YourOrder() {
  const { data, isLoading } = useQuery({
    queryKey: ["user-order"],
    queryFn: async () => {
      const res = await axiosInstance.get("/product/user-order");
      return res?.data;
    },
  });
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  console.log(data);
  return (
    <div className="p-4 flex gap-3 flex-wrap  ">
      {data?.data?.orderItems.length > 0 ? (
        <>
          {data?.data?.orderItems?.map((ele, index) => (
            <Link
              to={`/product/${ele?.productId?._id}`}
              key={index}
              className="border  border-gray rounded-md  p-3  "
            >
              <div className="flex gap-5  ">
                <img
                  src={getImageFromBackend(ele?.productId?.thumbnail)}
                  alt=""
                  width={200}
                  height={100}
                  className="rounded-md"
                />
                <div className=" flex flex-col justify-between items-start ">
                  <h3>{ele?.productId?.name}</h3>
                  <p>Quantity: {ele?.totalQuantity}</p>
                  <p>Total Price: {ele?.totalPrice}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>
          <div className="w-full gap-4 mt-52 flex justify-center items-center flex-col">
            <h3>No Order Found</h3>
            <Link
              to="/"
              className="border rounded-md bg-blue-500 px-4 py-2 text-white "
            >
              See Our Products
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default YourOrder;
