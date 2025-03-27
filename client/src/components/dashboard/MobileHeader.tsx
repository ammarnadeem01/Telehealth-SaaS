// components/dashboard/MobileHeader.tsx
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserNav } from "./UserNav";
import { Calendar } from "lucide-react";

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col w-64">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <span>TeleCure</span>
            </Link>

            <Link
              to="/dashboard/appointments"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Calendar className="h-5 w-5" />
              Appointments
            </Link>

            {/* Add other mobile navigation items */}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="ml-auto">
        <UserNav />
      </div>
    </header>
  );
}
