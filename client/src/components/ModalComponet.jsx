import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function ModalComponet({ isOpen, isEdit = false, handleClose, children }) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",

          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction="column" sx={{ gap: 2 }}>
          {/* <Stack direction="row" justifyContent="space-between" sx={{ gap: 3 }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginLeft: 2 }}
            >
              {isEdit ? (
                <>Update Product variant</>
              ) : (
                <>Create Product variant</>
              )}
            </Typography>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon color="balck" />
            </Button>
          </Stack> */}
          {children}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalComponet;
