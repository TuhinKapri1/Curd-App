import { Box, Container } from "@mui/material";
import React from "react";
import Nav from "../components/Nav";

function MainLayout({ children }) {
  return (
    <>
      {" "}
      <Nav />
      <Container>
        <Box>{children}</Box>
      </Container>
    </>
  );
}

export default MainLayout;
