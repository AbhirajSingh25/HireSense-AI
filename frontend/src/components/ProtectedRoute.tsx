import {
  Navigate,
} from "react-router-dom";

import {
  isAuthenticated,
} from "../store/authStore";


function ProtectedRoute({

  children,

}: any) {

  if (
    !isAuthenticated()
  ) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
}

export default ProtectedRoute;