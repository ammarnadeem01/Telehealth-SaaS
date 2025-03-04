// src/components/doctor/DoctorLayout.tsx
import { Outlet } from "react-router-dom";
import { DoctorSidebar } from "./DoctorSidebar";
import { MobileHeader } from "@/components/dashboard/MobileHeader";
import { UserNav } from "@/components/dashboard/UserNav";

export function DoctorLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DoctorSidebar />
      <MobileHeader />

      <main className="md:ml-64 pt-14">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
