// src/pages/doctor/VideoConsults.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function VideoConsults() {
  const consultations = [
    { id: 1, patient: "Alice Smith", time: "10:00 AM", status: "upcoming" },
    { id: 2, patient: "Bob Wilson", time: "2:30 PM", status: "completed" },
  ];
  const nav = useNavigate();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Video Consultations</h1>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-blue-600">Scheduled Consults</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-blue-600">Patient</TableHead>
                <TableHead className="text-blue-600">Time</TableHead>
                <TableHead className="text-blue-600">Status</TableHead>
                <TableHead className="text-blue-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((consult) => (
                <TableRow key={consult.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {consult.patient}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {consult.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        consult.status === "upcoming" ? "default" : "secondary"
                      }
                      className="bg-green-100 text-green-800"
                    >
                      {consult.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={
                        consult.status === "upcoming" ? "default" : "outline"
                      }
                      className="gap-1"
                    >
                      {consult.status === "upcoming" ? (
                        <div onClick={() => nav("/doctor/videoChat")}>
                          <Video className="h-4 w-4" />
                          Join
                        </div>
                      ) : (
                        <>
                          <Phone className="h-4 w-4" />
                          Follow Up
                        </>
                      )}
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
