import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace/>
  }
  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
