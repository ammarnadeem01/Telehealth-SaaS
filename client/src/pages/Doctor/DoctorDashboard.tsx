// src/pages/doctor/DoctorDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Calendar,
  User,
  FileText,
  Video,
  ClipboardList,
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

export function DoctorDashboard() {
  const todayAppointments = [
    { id: 1, patient: "Alice Smith", time: "10:00 AM", status: "confirmed" },
    { id: 2, patient: "Bob Wilson", time: "2:30 PM", status: "upcoming" },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Alice Smith",
      lastVisit: "2024-03-18",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Bob Wilson",
      lastVisit: "2024-03-15",
      condition: "Diabetes",
    },
  ];

  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-800">5</span>
              <Badge className="bg-green-100 text-green-800">+2 New</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Patients
            </CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-800">142</span>
              <Badge className="bg-blue-100 text-blue-800">View All</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Reports
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-800">3</span>
              <Badge className="bg-red-100 text-red-800">Urgent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Appointments
              </CardTitle>
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Link to="/doctor/appointments">Full Schedule</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-gray-50">
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="font-medium">
                      {appointment.patient}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                      >
                        Start Consultation
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <User className="h-5 w-5 text-purple-600" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Records
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <ClipboardList className="h-5 w-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-4">
            <Button className="w-full gap-2">
              <Video className="h-4 w-4" />
              Start Video Consult
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <FileText className="h-4 w-4" />
              Create Report
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Stethoscope className="h-4 w-4" />
              Add Diagnosis
            </Button>
          </CardContent>
        </Card>

        {/* Medical Records */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="h-5 w-5 text-orange-600" />
              Recent Medical Records
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 1,
                    patient: "Alice Smith",
                    date: "2024-03-18",
                    diagnosis: "Hypertension Stage 2",
                    status: "Completed",
                  },
                  {
                    id: 2,
                    patient: "Bob Wilson",
                    date: "2024-03-15",
                    diagnosis: "Type 2 Diabetes",
                    status: "Pending Lab",
                  },
                ].map((record) => (
                  <TableRow key={record.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {record.patient}
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
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
