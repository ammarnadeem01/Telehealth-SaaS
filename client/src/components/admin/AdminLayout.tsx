// src/components/admin/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { MobileHeader } from "@/components/dashboard/MobileHeader";
import { UserNav } from "@/components/dashboard/UserNav";

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <AdminSidebar />
      <MobileHeader />

      <main className="md:ml-64 pt-14">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
