import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance, getImageFromBackend } from "../helper/helper";
import CloseIcon from "@mui/icons-material/Close";
import {
  decrementCartItem,
  incrementCartItem,
  productRemoveFromCart,
  setCartValue,
} from "../redux/cartSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const navigate = useNavigate();
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
      dispatch(setCartValue([]));
      navigate("/dashboard/order");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { cartItems } = useSelector((state) => state?.cart);
  console.log(cartItems);
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
          name: "Choose Your payment option",
          currency: data?.currency,
          amount: data?.amount,
          order_id: data?.orderId,
          description: "Thankyou for your test donation",
          handler: function (response) {
            verifyOrderMutate({
              ...response,
              products: JSON.stringify(cartItems),
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

  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(productRemoveFromCart(data));
  };

  const checkOutHandler = async () => {
    createOrderMutate({
      products: JSON.stringify(cartItems),
    });
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    console.log(res);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Stack>
        <Stack sx={{ gap: 3 }}>
          {cartItems.length > 0 ? (
            <>
              {cartItems?.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  spacing={2}
                  sx={{ gap: 10 }}
                >
                  <Stack direction="column" sx={{ gap: 5 }} spacing={1}>
                    <Stack direction="row" alignItems="center" sx={{ gap: 4 }}>
                      <img
                        src={getImageFromBackend(item?.data?.thumbnail)}
                        width={100}
                        alt={item?.name}
                      />
                      <h3>{item?.data?.name}</h3>
                    </Stack>
                  </Stack>
                  <Stack direction="row" sx={{ gap: 3 }} alignItems="center">
                    <button
                      variant="outlined"
                      className="border flex justify-center items-center border-gray-500 rounded-md h-8 w-8"
                      onClick={() =>
                        dispatch(
                          decrementCartItem({
                            _id: item?.data?._id,
                            quantity: 1,
                          })
                        )
                      }
                    >
                      <span className="text-[24px] font-semibold ">-</span>
                    </button>
                    <div>{item?.totalQuantity}</div>
                    <button
                      className="border flex justify-center items-center border-gray-500 rounded-md h-8 w-8"
                      onClick={() =>
                        dispatch(
                          incrementCartItem({
                            _id: item?.data?._id,
                            quantity: 1,
                          })
                        )
                      }
                      sx={{ text: "20px" }}
                    >
                      <span className="text-[24px] font-semibold ">+</span>
                    </button>
                  </Stack>
                  <Stack direction="row " sx={{ gap: 3 }}>
                    <p>Total Price</p>
                    <p>{item?.totalPrice}</p>
                  </Stack>
                  <Stack>
                    <button
                      onClick={() => removeFromCartHandler(item?.data?._id)}
                      className="border border-gray-400 rounded-full h-10 w-10"
                    >
                      <CloseIcon color="error" />
                    </button>
                  </Stack>
                </Stack>
              ))}

              <Stack sx={{ marginTop: 7 }} direction="row" justifyContent="end">
                <Stack sx={{ gap: 3 }}>
                  <div>
                    Subtotal : $
                    {cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                  </div>
                  <Button
                    onClick={() => {
                      checkOutHandler();
                    }}
                    variant="outlined"
                    sx={{ width: "100px" }}
                  >
                    Checkout
                  </Button>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <div>Your cart is empty</div>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default CartPage;
