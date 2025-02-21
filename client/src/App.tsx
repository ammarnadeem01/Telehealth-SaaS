import ForgotPassword from "@pages/Auth/ForgotPasswrord";
import Login from "@pages/Auth/Login";
import ResetPassword from "@pages/Auth/ResetPassword";
import RoleProtectedRoute from "@pages/Auth/RoleProtectedRoutes";
import Signup from "@pages/Auth/Signup";
import Unauthorized from "@pages/Auth/Unauthorized";
import Profile from "@pages/User/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route element={<RoleProtectedRoute allowedRoles={["user", "admin"]} />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>

      {/* Admin-Only Routes */}
      <Route element={<RoleProtectedRoute allowedRoles={["doctor"]} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
