import {
  Navigate,
} from "react-router-dom";

import type {
  ReactElement
} from "react";

import {
  useAuth,
} from "../context/AuthContext";


interface ProtectedRouteProps {

  children: ReactElement;
}


function ProtectedRoute({

  children,

}: ProtectedRouteProps) {

  const {
    isAuthenticated,
  } = useAuth();


  if (
    !isAuthenticated
  ) {

    return (

      <Navigate
        to="/login"
        replace
      />
    );
  }


  return children;
}

export default ProtectedRoute;