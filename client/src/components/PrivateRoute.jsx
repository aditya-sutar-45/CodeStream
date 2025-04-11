import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ unauthorized: true }} replace />
  );
}

export default PrivateRoute;
