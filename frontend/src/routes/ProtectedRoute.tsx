// frontend/src/routes/ProtectedRoute.tsx

import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


interface Props {

  children: React.ReactNode;
}


function ProtectedRoute({

  children,
}: Props) {

  const auth =
    useAuth();

  if (!auth.user) {

    return (
      <Navigate to="/login" />
    );
  }

  return children;
}

export default ProtectedRoute;