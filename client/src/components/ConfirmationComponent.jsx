import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

function ConfirmationComponent({
  handleClose,
  deleteSubmitHandler,
  isLoading,
  deleteHandler,
}) {
  const confirmHandler = () => {
    deleteSubmitHandler();
  };
  const cancelHandler = () => {
    handleClose(false);
  };
  return (
    <Box>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        You want to delete this product
      </Typography>
      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        You can't get this thing
      </Typography>
      <Stack direction="row" justifyContent="end" sx={{ gap: 2, marginTop: 3 }}>
        <Button variant="contained" color="error" onClick={cancelHandler}>
          Cancel
        </Button>

        <LoadingButton
          variant="contained"
          onClick={confirmHandler}
          loading={isLoading}
        >
          <span>Submit</span>
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default ConfirmationComponent;
