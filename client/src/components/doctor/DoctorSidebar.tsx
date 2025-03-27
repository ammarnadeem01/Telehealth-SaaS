// src/components/doctor/DoctorSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Calendar,
  User,
  FileText,
  Video,
  ClipboardList,
} from "lucide-react";

export function DoctorSidebar() {
  const { pathname } = useLocation();

  const navItems = [
    {
      title: "Practice",
      items: [
        {
          label: "Dashboard",
          href: "/doctor",
          icon: <Stethoscope className="h-4 w-4" />,
        },
        {
          label: "Appointments",
          href: "/doctor/appointments",
          icon: <Calendar className="h-4 w-4" />,
        },
        {
          label: "Patients",
          href: "/doctor/patients",
          icon: <User className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Medical",
      items: [
        {
          label: "Medical Records",
          href: "/doctor/records",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          label: "Messages",
          href: "/doctor/messages",
          icon: <Video className="h-4 w-4" />,
        },
        {
          label: "Video Consults",
          href: "/doctor/consults",
          icon: <Video className="h-4 w-4" />,
        },
        {
          label: "Prescriptions",
          href: "/doctor/prescriptions",
          icon: <ClipboardList className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen w-64 fixed left-0 top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/doctor" className="flex items-center gap-2 font-semibold">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl">Doctor Portal</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          {navItems.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3",
                      pathname === item.href && "bg-accent"
                    )}
                  >
                    <Link to={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
