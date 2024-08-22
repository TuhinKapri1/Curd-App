import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.profile);
  return token ? <Navigate to="/"></Navigate> : children;
}

export default OpenRoute;
