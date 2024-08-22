import { Box, Container } from "@mui/material";
import React from "react";
import Nav from "../components/Nav";

function MainLayout({ children }) {
  return (
    <>
      {" "}
      <Nav />
      <div className="">
        <Box>{children}</Box>
      </div>
    </>
  );
}

export default MainLayout;
