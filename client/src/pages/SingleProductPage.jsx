import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, getImageFromBackend } from "../helper/helper";
import { getSingleProduct } from "../services/productServices";
import { Button, Container, Stack } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
function SingleProductPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { cartItems } = useSelector((state) => state.cart);
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

  console.log(cartItems);

  const addToCartHandler = () => {
    dispatch(addToCart({ data: data?.product ?? null, quantity: 1 }));
  };

  const checkIncludeOrNot = (data) => {
    const res = cartItems.find((item) => {
      console.log(item?.data?._id);
      console.log(data?.product._id);
      return item?.data?._id === data?.product?._id;
    });
    return res;
  };
  if (data) {
    console.log(checkIncludeOrNot(data));
  }

  const goToCartHandler=()=>{
    navigate('/dashboard/cart')
  }

  console.log(data?.product._id);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <img
            src={getImageFromBackend(data?.product?.thumbnail)}
            width={400}
            height={300}
            alt="wr2wr"
          />
          <div className="ms-32 mt-5">
            <h1 className="text-2xl font-semibold  "> {data?.product?.name}</h1>
            <p className="text-[16px] font-semibold ">
              {" "}
              {data?.product?.description}
            </p>
            <p>
              {" "}
              <span>
                <CurrencyRupeeIcon size="small" />
              </span>{" "}
              {data?.product?.productVarients[0]?.price}
            </p>
            {data?.product?.productVarients.length > 1 && (
              <div>
                <div className="flex gap-3 mt-5 ">
                  {data?.product?.productVarients.map((varient) => (
                    <div key={varient._id} className="flex gap-2">
                      {/* {varient.color == "Black" && (
                        <div>
                          <div className="w-10 h-10 rounded-full border bg-black border-gray-600"></div>
                          <p>{varient.color}</p>
                        </div>
                      )}
                      {varient.color == "White" && (
                        <div>
                          <div className="w-10 h-10 rounded-full border bg-white border-gray-600"></div>
                          <p>{varient.color}</p>
                        </div>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Stack
              direction="row"
              sx={{ gap: 2, marginTop: 4 }}
              justifyContent="space-between"
            >
              {checkIncludeOrNot(data) ? (
                <>
                  {" "}
                  <Button variant="contained" onClick={goToCartHandler}>
                    GoToCart
                  </Button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Button variant="contained" onClick={addToCartHandler}>
                    AddToCart
                  </Button>
                </>
              )}

             
              <Button variant="contained">BuyNow</Button>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SingleProductPage;
