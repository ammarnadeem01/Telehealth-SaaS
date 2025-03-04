// src/pages/doctor/MedicalRecords.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");

  const records = [
    {
      id: 1,
      patient: "Alice Smith",
      diagnosis: "Hypertension",
      date: "2024-03-18",
      status: "Active",
    },
    {
      id: 2,
      patient: "Bob Wilson",
      diagnosis: "Diabetes",
      date: "2024-03-15",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Medical Records</h1>
        <Button className="gap-2 bg-green-600 hover:bg-green-700">
          <FilePlus className="h-4 w-4" />
          New Record
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search records..."
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
                <TableHead className="text-green-600">Patient</TableHead>
                <TableHead className="text-green-600">Diagnosis</TableHead>
                <TableHead className="text-green-600">Date</TableHead>
                <TableHead className="text-green-600">Status</TableHead>
                <TableHead className="text-green-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {record.patient}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {record.diagnosis}
                  </TableCell>
                  <TableCell className="text-gray-600">{record.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Active" ? "default" : "secondary"
                      }
                      className="bg-blue-100 text-blue-800"
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" className="text-green-600">
                      View Details
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
