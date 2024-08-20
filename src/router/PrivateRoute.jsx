import React from "react";
import { Navigate } from "react-router-dom";
import { useContextGlobal } from "../context/Context";

const PrivateRoute = ({ children }) => {
  const { state } = useContextGlobal();
  const { validAdmin, validUser } = state;

  return validAdmin || validUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
