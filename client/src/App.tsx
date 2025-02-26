import EmailSent from "@/pages/Auth/EmailSent";
import ForgotPassword from "@/pages/Auth/ForgotPasswrord";
import Login from "@/pages/Auth/Login";
import ResetPassword from "@/pages/Auth/ResetPassword";
import RoleProtectedRoute from "@/pages/Auth/RoleProtectedRoutes";
import Signup from "@/pages/Auth/Signup";
import Unauthorized from "@/pages/Auth/Unauthorized";
import Profile from "@/pages/User/Profile";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import Analytics from "./pages/Admin/Dashboard/Analytics";
import Patients from "./pages/Admin/Dashboard/Patients";
import Doctors from "./pages/Admin/Dashboard/Doctors";
import Appointments from "./pages/Admin/Dashboard/Appointments";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route
        element={<RoleProtectedRoute allowedRoles={["user", "admin"]} />}
      ></Route>
      <Route element={<RoleProtectedRoute allowedRoles={["doctor"]} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
