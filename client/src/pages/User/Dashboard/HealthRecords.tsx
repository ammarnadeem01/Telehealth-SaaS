// src/pages/dashboard/HealthRecordsTab.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  PlusCircle,
  Stethoscope,
  User,
  FileText,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  details: string;
  doctor: string;
  reportUrl?: string;
}

export default function HealthRecordsTab() {
  const [isDoctor] = useState(true); // Replace with actual role check
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      date: "2024-03-15",
      type: "Blood Test",
      details: "Complete blood count results within normal range",
      doctor: "Dr. Sarah Johnson",
      reportUrl: "/reports/blood-test-20240315.pdf",
    },
    {
      id: "2",
      date: "2024-02-28",
      type: "X-Ray",
      details: "Chest X-ray showing clear lungs",
      doctor: "Dr. Michael Chen",
      reportUrl: "/reports/xray-20240228.pdf",
    },
  ]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    type: "",
    details: "",
    file: null as File | null,
  });

  const handleFileUpload = async (file: File) => {
    // Implement actual file upload logic
    return URL.createObjectURL(file);
  };

  const addMedicalEntry = async () => {
    const reportUrl = newEntry.file
      ? await handleFileUpload(newEntry.file)
      : undefined;

    setRecords([
      ...records,
      {
        id: Date.now().toString(),
        date: newEntry.date || new Date().toISOString().split("T")[0],
        type: newEntry.type,
        details: newEntry.details,
        doctor: "Dr. Smith",
        reportUrl,
      },
    ]);

    setNewEntry({ date: "", type: "", details: "", file: null });
  };

  const downloadReport = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "report";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical History
            </CardTitle>
            {isDoctor && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Medical Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, date: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Entry Type"
                      value={newEntry.type}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, type: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Clinical Details"
                      value={newEntry.details}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, details: e.target.value })
                      }
                    />
                    <Input
                      type="file"
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          file: e.target.files?.[0] || null,
                        })
                      }
                    />
                    <Button onClick={addMedicalEntry} className="w-full">
                      Save Entry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {new Date(record.date).toLocaleDateString()}
                        </Badge>
                        <span className="font-medium">{record.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {record.details}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="h-4 w-4" />
                        {record.doctor}
                      </div>
                    </div>
                    {record.reportUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReport(record.reportUrl!)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
