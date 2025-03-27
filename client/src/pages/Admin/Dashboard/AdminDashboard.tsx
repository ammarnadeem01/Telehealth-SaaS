// import {
//   Bell,
//   Calendar,
//   CircleUser,
//   Home,
//   LineChart,
//   Menu,
//   Package2,
//   Search,
//   Users,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { NavLink, Outlet } from "react-router-dom";

// export const description =
//   "A doctors and appointments dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

// export default function AdminDashboard() {
//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       {/* Sidebar */}
//       <div className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <NavLink
//               to="/admin/dashboard"
//               className="flex items-center gap-2 font-semibold"
//             >
//               <Package2 className="h-6 w-6" />
//               <span>Clinic Admin</span>
//             </NavLink>
//             <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//               <Bell className="h-4 w-4" />
//               <span className="sr-only">Toggle notifications</span>
//             </Button>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               <NavLink
//                 to="/admin/dashboard"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </NavLink>
//               <NavLink
//                 to="/admin/appointments"
//                 className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
//               >
//                 <Calendar className="h-4 w-4" />
//                 Appointments
//                 <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                   6
//                 </Badge>
//               </NavLink>
//               <NavLink
//                 to="/admin/doctors"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <CircleUser className="h-4 w-4" />
//                 Doctors
//               </NavLink>
//               <NavLink
//                 to="/admin/patients"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Users className="h-4 w-4" />
//                 Patients
//               </NavLink>
//               <NavLink
//                 to="/admin/analytics"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <LineChart className="h-4 w-4" />
//                 Analytics
//               </NavLink>
//             </nav>
//           </div>
//           <div className="mt-auto p-4">
//             <Card x-chunk="dashboard-02-chunk-0">
//               <CardHeader className="p-2 pt-0 md:p-4">
//                 <CardTitle>Manage Clinic</CardTitle>
//                 <CardDescription>
//                   Add or update doctor profiles and schedule appointments.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
//                 <Button size="sm" className="w-full">
//                   Manage
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-col">
//         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col">
//               <nav className="grid gap-2 text-lg font-medium">
//                 <NavLink
//                   to="/admin/dashboard"
//                   className="flex items-center gap-2 text-lg font-semibold"
//                 >
//                   <Package2 className="h-6 w-6" />
//                   <span className="sr-only">Clinic Admin</span>
//                 </NavLink>
//                 <NavLink
//                   to="/admin/dashboard"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </NavLink>
//                 <NavLink
//                   to="/admin/appointments"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
//                 >
//                   <Calendar className="h-5 w-5" />
//                   Appointments
//                   <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                     6
//                   </Badge>
//                 </NavLink>
//                 <NavLink
//                   to="/admin/doctors"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <CircleUser className="h-5 w-5" />
//                   Doctors
//                 </NavLink>
//                 <NavLink
//                   to="/admin/patients"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Users className="h-5 w-5" />
//                   Patients
//                 </NavLink>
//                 <NavLink
//                   to="/admin/analytics"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <LineChart className="h-5 w-5" />
//                   Analytics
//                 </NavLink>
//               </nav>
//               <div className="mt-auto">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Manage Clinic</CardTitle>
//                     <CardDescription>
//                       Add or update doctor profiles and schedule appointments.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button size="sm" className="w-full">
//                       Manage
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </SheetContent>
//           </Sheet>
//           <div className="w-full flex-1">
//             <form>
//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search appointments..."
//                   className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
//                 />
//               </div>
//             </form>
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary" size="icon" className="rounded-full">
//                 <CircleUser className="h-5 w-5" />
//                 <span className="sr-only">Toggle user menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Support</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </header>
//         <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// src/pages/admin/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Activity, Lock, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboard() {
  const systemMetrics = [
    {
      id: 1,
      name: "Active Users",
      value: "2,345",
      trend: "+14%",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 2,
      name: "Today's Appointments",
      value: "156",
      trend: "3.2%",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      id: 3,
      name: "System Load",
      value: "24%",
      trend: "Optimal",
      icon: <Activity className="h-6 w-6" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Dr. Sarah",
      action: "Updated patient records",
      time: "2h ago",
      role: "Doctor",
    },
    {
      id: 2,
      user: "Admin",
      action: "Modified user permissions",
      time: "4h ago",
      role: "Admin",
    },
    {
      id: 3,
      user: "John Doe",
      action: "Booked appointment",
      time: "6h ago",
      role: "Patient",
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{metric.value}</span>
                <Badge variant="secondary" className="text-sm">
                  {metric.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Management */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Recent User Activity
              </CardTitle>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">
                      {activity.user}
                    </TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          activity.role === "Admin" ? "destructive" : "outline"
                        }
                      >
                        {activity.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {activity.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span className="font-medium">Security Status</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                All Systems Secure
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Audit Logs</span>
              </div>
              <Badge variant="secondary">24 New Entries</Badge>
            </div>

            <div className="col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Storage Usage
                </span>
                <span className="text-sm font-medium">65% Used</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: "65%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">
              Platform Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 p-6">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="col-span-2 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <span className="text-muted-foreground">
                  User Engagement Chart
                </span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-2xl font-bold">84%</div>
                  <div className="text-sm text-muted-foreground">
                    Active Sessions
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-2xl font-bold">1.2k</div>
                  <div className="text-sm text-muted-foreground">
                    New Patients
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
