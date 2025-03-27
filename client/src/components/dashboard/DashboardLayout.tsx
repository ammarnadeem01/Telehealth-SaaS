// // src/components/dashboard/DashboardLayout.tsx
// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import UserSidebar from "./UserSidebar";
// import { HiMenu } from "react-icons/hi";
// import { FiBell } from "react-icons/fi";

// const DashboardLayout = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Header */}
//       <header className="md:hidden fixed w-full top-0 bg-white shadow-sm z-50">
//         <div className="flex items-center justify-between p-4">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             <HiMenu className="w-6 h-6" />
//           </button>
//           <div className="flex items-center gap-4">
//             <button className="text-gray-600 hover:text-gray-800 relative">
//               <FiBell className="w-6 h-6" />
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 3
//               </span>
//             </button>
//             <img
//               src="/user-avatar.jpg"
//               alt="Profile"
//               className="w-8 h-8 rounded-full"
//             />
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside
//           className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out z-40 ${
//             isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0`}
//         >
//           <UserSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// components/dashboard/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      <MobileHeader />

      <main className="md:pl-64 pt-14">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
