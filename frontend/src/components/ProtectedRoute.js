import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(CurrentUserContext);

  if (!isAuth) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
