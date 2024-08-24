import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance, getImageFromBackend } from "../helper/helper";
import { getSingleProduct } from "../services/productServices";
import { Button, Container, Stack } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, productRemoveFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
function SingleProductPage() {
  const { isPending: veryPending, mutate: verifyOrderMutate } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axiosInstance.post("/order/verify-order", data);
        return res.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Order placed successfully");
      dispatch(productRemoveFromCart(data?.productId));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.profile);
  console.log(token);
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const { isPending, mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put("/cart", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { isPending: createOrderPending, mutate: createOrderMutate } =
    useMutation({
      mutationFn: async (data) => {
        try {
          const res = await axiosInstance.post("/order/create-order", data);
          return res.data;
        } catch (err) {
          return Promise.reject(err);
        }
      },
      onSuccess: (data) => {
        console.log(data);
        var options = {
          key: "rzp_test_pCn23sTAT9sll0",
          name: data?.name,
          currency: data?.currency,
          amount: data?.amount,
          order_id: data?.orderId,
          description: "Thankyou for your test donation",
          handler: function (response) {
            verifyOrderMutate({
              ...response,
              products: JSON.stringify([{ productId: id, quantity: 1 }]),
            });
            console.log(response);
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      },
      onError: (err) => {
        console.log(err);
      },
    });
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

  const initializeRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const clickHandler = async (data) => {
    console.log(data);

    const dt = {
      products: JSON.stringify([{ productId: data._id }]),
      amount: data?.productVarients[0].price,
    };

    createOrderMutate(dt);
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    console.log(res);
  };

  console.log(cartItems);
  console.log(data?.product);

  const addToCartHandler = () => {
    dispatch(addToCart({ data: data?.product ?? null, quantity: 1 }));
    mutate({ productId: data?.product?._id, quantity: 1 });
    toast.success("Product added successfully");
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

  const goToCartHandler = () => {
    navigate("/dashboard/cart");
  };

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
              {token && (
                <>
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
                </>
              )}

              {/* {token ? (
                <>
                  <Button
                    onClick={() => {
                      clickHandler(data?.product);
                    }}
                    variant="contained"
                  >
                    bUY nOW
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    variant="contained"
                    className="border rounded-md px-4 py-2  bg-blue-500 text-white   "
                  >
                    SignInToBuy
                  </Link>
                </>
              )} */}
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SingleProductPage;
