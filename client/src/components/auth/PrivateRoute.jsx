import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.profile);
  return token ? children  : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
