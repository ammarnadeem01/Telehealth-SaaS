import { Navigate, Outlet } from "react-router-dom";
interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const token: string | null = localStorage.getItem("token");
  const role: string | null = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role && !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};
export default RoleProtectedRoute;
