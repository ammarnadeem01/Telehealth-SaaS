// src/pages/doctor/Appointments.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Video, Calendar, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function DoctorAppointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const appointments = [
    {
      id: 1,
      patient: "Alice Smith",
      date: "2024-03-20",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Bob Wilson",
      date: "2024-03-21",
      time: "2:30 PM",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                onClick={() => setSelectedStatus("all")}
              >
                All
              </Button>
              <Button
                variant={selectedStatus === "confirmed" ? "default" : "outline"}
                onClick={() => setSelectedStatus("confirmed")}
              >
                Confirmed
              </Button>
              <Button
                variant={selectedStatus === "pending" ? "default" : "outline"}
                onClick={() => setSelectedStatus("pending")}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-blue-600">Patient</TableHead>
                <TableHead className="text-blue-600">Date</TableHead>
                <TableHead className="text-blue-600">Time</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {appointment.patient}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {appointment.date}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {appointment.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        appointment.status === "confirmed"
                          ? "default"
                          : "secondary"
                      }
                      className="bg-green-100 text-green-800"
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" className="text-blue-600 gap-1">
                      <Video className="h-4 w-4" />
                      Start
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
