import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useApp";

export function PrivateRoute() {
  const user = useAppSelector((state) => state.account.user);
  return user.token ? <Outlet /> : <Navigate to='login' replace />;
}
