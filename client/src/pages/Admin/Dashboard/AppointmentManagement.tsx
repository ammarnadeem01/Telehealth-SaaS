// src/pages/admin/AppointmentManagement.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AppointmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const appointments = [
    {
      id: 1,
      patient: "Alice Smith",
      doctor: "Dr. Chen",
      date: "2024-03-20",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Bob Wilson",
      doctor: "Dr. Patel",
      date: "2024-03-21",
      status: "pending",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || appointment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
        <Button className="gap-2 bg-blue-500">
          <Plus className="h-4 w-4" />
          Create Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className={`${
                  selectedStatus === "all"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedStatus("all")}
              >
                All
              </Button>
              <Button
                className={`${
                  selectedStatus === "confirmed"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedStatus("confirmed")}
              >
                Confirmed
              </Button>
              <Button
                className={`${
                  selectedStatus === "pending"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedStatus("pending")}
              >
                Pending
              </Button>
              <Button
                className={`${
                  selectedStatus === "cancelled"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedStatus("cancelled")}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.patient}
                  </TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        appointment.status === "confirmed"
                          ? "default"
                          : appointment.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
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
