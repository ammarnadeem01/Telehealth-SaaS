// src/pages/doctor/Prescriptions.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Pill } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");

  const prescriptions = [
    {
      id: 1,
      patient: "Alice Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      status: "Active",
    },
    {
      id: 2,
      patient: "Bob Wilson",
      medication: "Metformin",
      dosage: "500mg",
      status: "Expired",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
          <Pill className="h-4 w-4" />
          New Prescription
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search prescriptions..."
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
                <TableHead className="text-orange-600">Patient</TableHead>
                <TableHead className="text-orange-600">Medication</TableHead>
                <TableHead className="text-orange-600">Dosage</TableHead>
                <TableHead className="text-orange-600">Status</TableHead>
                <TableHead className="text-orange-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {prescription.patient}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {prescription.medication}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {prescription.dosage}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        prescription.status === "Active"
                          ? "default"
                          : "destructive"
                      }
                      className="bg-green-100 text-green-800"
                    >
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" className="text-orange-600">
                      Renew
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
