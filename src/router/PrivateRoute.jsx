import React from "react";
import { Navigate } from "react-router-dom";
import { useContextGlobal } from "../context/Context";

const PrivateRoute = ({ children }) => {
  const { state } = useContextGlobal();
  const { token } = state;
  console.log(token);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
