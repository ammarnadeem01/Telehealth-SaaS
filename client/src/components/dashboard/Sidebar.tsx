// components/dashboard/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  MessageSquare,
  Video,
  FileText,
} from "lucide-react";

export function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    {
      title: "Health Services",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/user/dashboard",
        },
        {
          icon: Calendar,
          label: "Appointments",
          href: "/user/appointments",
        },
        {
          icon: Stethoscope,
          label: "AI Symptom Check",
          href: "/user/symptom-check",
        },
        {
          icon: FileText,
          label: "Medical History",
          href: "/user/medical-history",
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          icon: Video,
          label: "Video Consult",
          href: "/user/video-consult",
        },
        {
          icon: MessageSquare,
          label: "Messages",
          href: "/user/messages",
        },
      ],
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen w-64 fixed left-0 top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">TeleCure</span>
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
                      <item.icon className="h-4 w-4" />
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
