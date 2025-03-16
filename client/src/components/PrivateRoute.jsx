import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" replace/>
  }
  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
