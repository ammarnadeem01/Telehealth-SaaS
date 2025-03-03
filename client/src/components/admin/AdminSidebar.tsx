// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Shield,
  Settings,
  Activity,
  FileText,
  Lock,
  BriefcaseMedical,
} from "lucide-react";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const navItems = [
    {
      title: "Administration",
      items: [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: <Activity className="h-4 w-4" />,
        },
        {
          label: "User Management",
          href: "/admin/users",
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: "Appointments",
          href: "/admin/appointments",
          icon: <Calendar className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          label: "Roles & Permissions",
          href: "/admin/roles",
          icon: <Lock className="h-4 w-4" />,
        },
        {
          label: "Audit Logs",
          href: "/admin/audit",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          label: "Medical Resources",
          href: "/admin/resources",
          icon: <BriefcaseMedical className="h-4 w-4" />,
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen w-64 fixed left-0 top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-purple-600" />
            <span className="text-xl">Admin Portal</span>
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
