// src/pages/doctor/PatientManagement.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, FileText, MessageSquare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    {
      id: 1,
      name: "Alice Smith",
      condition: "Hypertension",
      lastVisit: "2024-03-18",
    },
    {
      id: 2,
      name: "Bob Wilson",
      condition: "Diabetes",
      lastVisit: "2024-03-15",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
          <User className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-purple-600">Patient</TableHead>
                <TableHead className="text-purple-600">Condition</TableHead>
                <TableHead className="text-purple-600">Last Visit</TableHead>
                <TableHead className="text-purple-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {patient.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {patient.condition}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        className="text-purple-600"
                        size="sm"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-blue-600"
                        size="sm"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
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
