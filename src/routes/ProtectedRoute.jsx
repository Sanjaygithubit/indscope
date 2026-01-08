import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // User login illa na login page-ku redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Login irundha page show pannum
  return children;
}

export default ProtectedRoute;
