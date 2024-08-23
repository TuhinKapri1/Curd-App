import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductVariantForm from "./ProductVariantForm";
import CloseIcon from "@mui/icons-material/Close";
import { setProduct, setStep, setUpadte } from "../../../../redux/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { EditNoteSharp } from "@mui/icons-material";
import ModalComponet from "../../../ModalComponet";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ConfirmationComponent from "../../../ConfirmationComponent";
import { useMutation } from "@tanstack/react-query";
import { deleteProductVariant } from "../../../../services/productServices";
function ProductVariant() {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: deleteProductVariant,
    onSuccess: (data) => {
      console.log(data);
      const arr = [...product.productVarients];
      const index = arr.findIndex((ele) => ele._id === deleteData);
      if (index > -1) {
        arr.splice(index, 1);
        dispatch(setProduct({ ...product, productVarients: [...arr] }));
      }

      setDeleteOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const editHandler = (data) => {
    const variantdata = product?.productVarients?.find(
      (ele) => ele._id === data
    );
    setEditData(variantdata);
    setOpen(true);
  };
  const deleteHandler = (data) => {
    console.log(data);
    setDeleteData(data);
    setDeleteOpen(true);
  };
  const deleteSubmitHandler = () => {
    console.log("i am submit");
    deleteMutate({ productId: product._id, productVariantId: deleteData });
  };
  return (
    <Box>
      <Stack direction="column" sx={{ gap: 2 }}>
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            type="button"
            fullWidth
            loading={false}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, width: 6 }}
            onClick={() => {
              dispatch(setStep(1));
              dispatch(setUpadte(true));
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button
            onClick={handleOpen}
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
          >
            Create Product variant
          </Button>

          <ModalComponet isOpen={open} handleClose={handleClose}>
            <ProductVariantForm handleClose={handleClose} />
          </ModalComponet>
        </Stack>
        <Box sx={{ padding: 4 }}>
          {product?.productVarients?.length > 0 ? (
            <Stack direction="row" sx={{ gap: 2 }}>
              {product.productVarients.map((variant, index) => (
                <Box
                  key={index}
                  sx={{ padding: 2, border: "1px solid gray", borderRadius: 2 }}
                >
                  <Typography> Color - {variant.color}</Typography>
                  <Typography> Price - {variant.price}</Typography>
                  <Typography>Quantity - {variant.quantity}</Typography>
                  <Typography> Size - {variant.size}</Typography>
                  <Stack
                    direction="row"
                    justifyContent="end"
                    sx={{ gap: 1, marginTop: 2 }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="secondary"
                      sx={{ border: "1px solid black" }}
                      onClick={() => {
                        editHandler(variant?._id);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{ border: "1px solid black" }}
                      onClick={() => {
                        deleteHandler(variant?._id);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography>No product variant found</Typography>
          )}
        </Box>
        {editData && (
          <ModalComponet isEdit={true} isOpen={open} handleClose={handleClose}>
            <ProductVariantForm
              handleClose={handleClose}
              isEdit={true}
              editData={editData}
            />
          </ModalComponet>
        )}
        {deleteData && (
          <ModalComponet isOpen={deleteOpen}>
            <ConfirmationComponent
              deleteHandler={deleteHandler}
              handleClose={setDeleteOpen}
              deleteSubmitHandler={deleteSubmitHandler}
              isLoading={isDeletePending}
            />
          </ModalComponet>
        )}
      </Stack>
    </Box>
  );
}

export default ProductVariant;
