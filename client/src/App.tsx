import EmailSent from "@/pages/Auth/EmailSent";
import ForgotPassword from "@/pages/Auth/ForgotPasswrord";
import Login from "@/pages/Auth/Login";
import ResetPassword from "@/pages/Auth/ResetPassword";
import RoleProtectedRoute from "@/pages/Auth/RoleProtectedRoutes";
import Signup from "@/pages/Auth/Signup";
import Unauthorized from "@/pages/Auth/Unauthorized";
import Profile from "@/pages/User/Profile";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import Analytics from "./pages/Admin/Dashboard/Analytics";
import Patients from "./pages/Admin/Dashboard/Patients";
import Doctors from "./pages/Admin/Dashboard/Doctors";
import Appointments from "./pages/Admin/Dashboard/Appointments";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import MedicalHistory from "./pages/User/Dashboard/MedicalHistory";
import SymptomCheck from "./pages/User/Dashboard/SymptompCheck";
import AppointmentsUser from "./pages/User/Dashboard/Appointments";
import VideoConsult from "./pages/User/Dashboard/VideoConsult";
import Messages from "./pages/User/Dashboard/Messages";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import UserManagement from "./pages/Admin/Dashboard/UserManagement";
import AppointmentManagement from "./pages/Admin/Dashboard/AppointmentManagement";
import { RolesPermissions } from "./pages/Admin/Dashboard/RolePermissions";
import { AuditLogs } from "./pages/Admin/Dashboard/AuditLogs";
import { SystemSettings } from "./pages/Admin/Dashboard/SystemSettings";
import { MedicalResources } from "./pages/Admin/Dashboard/MedicalResources";
import { DoctorLayout } from "./components/doctor/DoctorLayout";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import { DoctorAppointments } from "./pages/Doctor/DoctorAppointments";
import { PatientManagement } from "./pages/Doctor/PatientManagement";
import { MedicalRecords } from "./pages/Doctor/MedicalRecords";
import { Prescriptions } from "./pages/Doctor/Prescriptions";
import { VideoConsults } from "./pages/Doctor/VideoConsults";
import { Messages as Mess } from "./pages/Doctor/DocMessage";
import HealthRecords from "./pages/User/Dashboard/HealthRecords";
import Payment from "./pages/Payment/Payment";
import VideoChat from "./pages/Doctor/VideoChat";
import LandingPage from "./pages/User/LandingPage";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import Security from "./pages/Legal/Security";
import TermsOfService from "./pages/Legal/TermsOfService";
import AboutUs from "./components/AboutUs";
import Pricing from "./components/Pricing";
import DoctorList from "./pages/User/Doctors";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageNotFound from "./pages/User/PageNotFound";
import { ToastContainer } from "react-toastify";
import DoctorDetails from "./components/doctor/DoctorDetails";
import RoleSelection from "./pages/Auth/RoleSelection";
import DoctorAvailability from "./pages/User/DoctorAvaiability";

function App() {
  const location = useLocation();

  // Hide Navbar & Footer for dashboards (user/, doctor/, admin/)
  const hideHeaderFooter = !(
    location.pathname.startsWith("/user") ||
    (location.pathname.startsWith("/doctor") &&
      !location.pathname.startsWith("/doctorlist")) ||
    location.pathname.startsWith("/admin")
  );
  return (
    <>
      {hideHeaderFooter && <Navbar />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/doctorlist" element={<DoctorList />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/doctoravailability" element={<DoctorAvailability />} />
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/email-sent" element={<EmailSent />} />
        {/* DOCTOR DASHBOARD */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="consults" element={<VideoConsults />} />
          <Route path="messages" element={<Mess />} />
          <Route path="videoChat" element={<VideoChat />} />
          {/* Add other doctor routes */}
        </Route>
        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="roles" element={<RolesPermissions />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="resources" element={<MedicalResources />} />
        </Route>

        {/* USER DASHBOARD */}
        <Route path="/user" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="medical-history" element={<MedicalHistory />} />
          <Route path="symptom-check" element={<SymptomCheck />} />
          <Route path="appointments" element={<AppointmentsUser />} />
          <Route path="messages" element={<Messages />} />
          <Route path="video-consult" element={<VideoConsult />} />
          <Route path="health-records" element={<HealthRecords />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route
          element={<RoleProtectedRoute allowedRoles={["user", "admin"]} />}
        ></Route>
        <Route element={<RoleProtectedRoute allowedRoles={["patient", ""]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* PAYMENT */}
        <Route
          path="payment"
          element={<Payment appointmentId="67d3f29b80725d3bfc9363e8" />}
        />

        {/* LEGAL */}
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/termsofservice" element={<TermsOfService />} />

        {/* NOT FOUND */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
