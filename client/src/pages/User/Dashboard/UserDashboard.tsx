// src/pages/dashboard/DashboardPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  Calendar,
  HeartPulse,
  MessageSquare,
  Pill,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { AppointmentService } from "@/api/services/appointmentService";
import { useAuthStore } from "@/store/authStore";

const healthMetrics = [
  {
    id: 1,
    name: "Heart Rate",
    value: "72 BPM",
    status: "normal",
    icon: <HeartPulse className="h-4 w-4 text-blue-600" />,
  },
  {
    id: 2,
    name: "Blood Pressure",
    value: "120/80 mmHg",
    status: "normal",
    icon: <Activity className="h-4 w-4 text-green-600" />,
  },
  {
    id: 3,
    name: "Medications",
    value: "2 Active",
    status: "warning",
    icon: <Pill className="h-4 w-4 text-orange-600" />,
  },
];
export default function UserDashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const userId = useAuthStore((state: any) => state.userId);
  async function setUpcomingAppointmentsFunc() {
    const response: any = await AppointmentService.upcomingAppointents({
      userId,
    });
    console.log("data", response.data);
    setUpcomingAppointments(response.data);
  }
  async function setRecentMessagesFunc() {
    const response: any = await AppointmentService.upcomingAppointents({
      userId,
    });
    console.log("data", response.data);
    setUpcomingAppointments(response.data);
  }
  useEffect(() => {
    setUpcomingAppointmentsFunc();
    setRecentMessagesFunc();
  }, [userId]);
  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthMetrics.map((metric) => (
          <Card
            key={metric.id}
            className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.name}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </span>
                <Badge
                  variant={
                    metric.status === "normal" ? "default" : "destructive"
                  }
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Appointments
              </CardTitle>
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Link to="/user/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="border-gray-200">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600">Doctor</TableHead>
                  <TableHead className="text-gray-600">Day/Date</TableHead>
                  <TableHead className="text-gray-600">Time</TableHead>
                  <TableHead className="text-gray-600">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.map((appointment: any) => (
                  <TableRow
                    key={appointment.id}
                    className="hover:bg-gray-50 border-gray-200"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {appointment.doctor.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(appointment.date).toDateString()}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(appointment.date).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.type === "Video Consultation"
                            ? "default"
                            : "secondary"
                        }
                        className="bg-blue-100 text-blue-800"
                      >
                        {appointment.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {/* <Card className="border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/user/appointments/new">Book New Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Link to="/user/video-consult">Start Video Consult</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Link to="/user/symptom-check">AI Symptom Check</Link>
            </Button>
          </CardContent>
        </Card> */}

        {/* Recent Messages */}
        <Card className="lg:col-span-3 border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Recent Messages
              </CardTitle>
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Link to="/user/messages">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {[
                  {
                    id: 1,
                    doctor: "Dr. Sarah Johnson",
                    message: "Please confirm your next appointment",
                    time: "2h ago",
                  },
                  {
                    id: 2,
                    doctor: "Dr. Michael Chen",
                    message: "Lab results are ready for review",
                    time: "1d ago",
                  },
                ].map((msg) => (
                  <TableRow
                    key={msg.id}
                    className="hover:bg-gray-50 border-gray-200"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {msg.doctor}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {msg.message}
                    </TableCell>
                    <TableCell className="text-gray-500">{msg.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
