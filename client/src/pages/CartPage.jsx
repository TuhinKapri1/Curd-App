import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageFromBackend } from "../helper/helper";
import CloseIcon from "@mui/icons-material/Close";
import {
  decrementCartItem,
  incrementCartItem,
  productRemoveFromCart,
} from "../redux/cartSlice";
function CartPage() {
  const { cartItems } = useSelector((state) => state?.cart);

  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(productRemoveFromCart(data));
  };
  return (
    <Container sx={{ marginTop: 5 }}>
      <Stack>
        <Stack sx={{gap:3}}>
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

              <Stack  sx={{ marginTop: 7, }} direction="row" justifyContent="end">
                <Stack sx={{gap:3}}>
                  <div>
                    Subtotal : $
                    {cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                  </div>
                  <Button variant="outlined" sx={{ width: "100px" }}>
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
