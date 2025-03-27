// // src/pages/dashboard/HealthRecordsTab.tsx
// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Download,
//   PlusCircle,
//   Stethoscope,
//   User,
//   FileText,
// } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   type: string;
//   details: string;
//   doctor: string;
//   reportUrl?: string;
// }

// export default function HealthRecordsTab() {
//   const [isDoctor] = useState(true); // Replace with actual role check
//   const [records, setRecords] = useState<MedicalRecord[]>([
//     {
//       id: "1",
//       date: "2024-03-15",
//       type: "Blood Test",
//       details: "Complete blood count results within normal range",
//       doctor: "Dr. Sarah Johnson",
//       reportUrl: "/reports/blood-test-20240315.pdf",
//     },
//     {
//       id: "2",
//       date: "2024-02-28",
//       type: "X-Ray",
//       details: "Chest X-ray showing clear lungs",
//       doctor: "Dr. Michael Chen",
//       reportUrl: "/reports/xray-20240228.pdf",
//     },
//   ]);
//   const [newEntry, setNewEntry] = useState({
//     date: "",
//     type: "",
//     details: "",
//     file: null as File | null,
//   });

//   const handleFileUpload = async (file: File) => {
//     // Implement actual file upload logic
//     return URL.createObjectURL(file);
//   };

//   const addMedicalEntry = async () => {
//     const reportUrl = newEntry.file
//       ? await handleFileUpload(newEntry.file)
//       : undefined;

//     setRecords([
//       ...records,
//       {
//         id: Date.now().toString(),
//         date: newEntry.date || new Date().toISOString().split("T")[0],
//         type: newEntry.type,
//         details: newEntry.details,
//         doctor: "Dr. Smith",
//         reportUrl,
//       },
//     ]);

//     setNewEntry({ date: "", type: "", details: "", file: null });
//   };

//   const downloadReport = (url: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = url.split("/").pop() || "report";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader className="border-b">
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               Medical History
//             </CardTitle>
//             {isDoctor && (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     Add Entry
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Add New Medical Entry</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <Input
//                       type="date"
//                       value={newEntry.date}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, date: e.target.value })
//                       }
//                     />
//                     <Input
//                       placeholder="Entry Type"
//                       value={newEntry.type}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, type: e.target.value })
//                       }
//                     />
//                     <Textarea
//                       placeholder="Clinical Details"
//                       value={newEntry.details}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, details: e.target.value })
//                       }
//                     />
//                     <Input
//                       type="file"
//                       onChange={(e) =>
//                         setNewEntry({
//                           ...newEntry,
//                           file: e.target.files?.[0] || null,
//                         })
//                       }
//                     />
//                     <Button onClick={addMedicalEntry} className="w-full">
//                       Save Entry
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             )}
//           </div>
//         </CardHeader>

//         <CardContent className="p-4">
//           <ScrollArea className="h-[600px]">
//             <div className="space-y-4">
//               {records.map((record) => (
//                 <div key={record.id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="outline">
//                           {new Date(record.date).toLocaleDateString()}
//                         </Badge>
//                         <span className="font-medium">{record.type}</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         {record.details}
//                       </p>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Stethoscope className="h-4 w-4" />
//                         {record.doctor}
//                       </div>
//                     </div>
//                     {record.reportUrl && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => downloadReport(record.reportUrl!)}
//                       >
//                         <Download className="mr-2 h-4 w-4" />
//                         Report
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// src/pages/dashboard/HealthRecordsTab.tsx
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Download, PlusCircle, Stethoscope, FileText } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   type: string;
//   details: string;
//   doctor: string;
//   reportUrl?: string;
// }

// export default function HealthRecordsTab() {
//   const [isDoctor] = useState(true); // Replace with actual role check
//   // You might retrieve the current patientId from your auth context or similar.
//   const patientId = "YOUR_PATIENT_ID";
//   const [records, setRecords] = useState<MedicalRecord[]>([]);
//   const [newEntry, setNewEntry] = useState({
//     date: "",
//     type: "",
//     details: "",
//     file: null as File | null,
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch medical records when component mounts
//   useEffect(() => {
//     async function fetchRecords() {
//       try {
//         const response = await fetch(
//           `/api/medicalRecords/patient/${patientId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch records");
//         }
//         const data = await response.json();
//         // Map the data from your API to the format your UI expects
//         const mappedRecords = data.map((record: any) => ({
//           id: record._id,
//           date: new Date(record.date).toISOString().split("T")[0],
//           type: record.title, // or another field if you prefer
//           details: record.description,
//           doctor: record.userId?.name || "Unknown", // populated by the API
//           reportUrl: record.filePath, // assuming filePath serves as a URL endpoint
//         }));
//         setRecords(mappedRecords);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchRecords();
//   }, [patientId]);

//   const handleFileUpload = async (file: File) => {
//     // In API integration, file uploading is done via FormData in the POST call below.
//     return file;
//   };

//   const addMedicalEntry = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("patientId", patientId);
//       formData.append("title", newEntry.type);
//       formData.append("description", newEntry.details);
//       formData.append(
//         "date",
//         newEntry.date || new Date().toISOString().split("T")[0]
//       );
//       if (newEntry.file) {
//         formData.append("file", newEntry.file);
//       }
//       let data;
//       try {
//         const response = await fetch(
//           "/api/medicalRecords/create-medical-record",
//           {
//             method: "POST",
//             body: formData,
//             // include credentials/headers if needed
//           }
//         );
//         data = await response.json();
//       } catch (error) {
//         // if (!response.ok) {
//         console.log(error);
//         throw new Error("Failed to create record");
//         // }
//       }
//       // Update the local state with the new record.
//       const newRecord: MedicalRecord = {
//         id: data.data._id,
//         date: new Date(data.data.date).toISOString().split("T")[0],
//         type: data.data.title,
//         details: data.data.description,
//         doctor: data.data.userId?.name || "Dr. Smith",
//         reportUrl: data.data.filePath,
//       };
//       setRecords((prevRecords) => [...prevRecords, newRecord]);
//       // Reset new entry fields
//       setNewEntry({ date: "", type: "", details: "", file: null });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReport = async (recordId: string) => {
//     try {
//       // We use the backend download endpoint which will trigger file download.
//       window.location.href = `/api/medicalRecords/${recordId}/download`;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader className="border-b">
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               Medical History
//             </CardTitle>
//             {isDoctor && (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     Add Entry
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Add New Medical Entry</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <Input
//                       type="date"
//                       value={newEntry.date}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, date: e.target.value })
//                       }
//                     />
//                     <Input
//                       placeholder="Entry Type"
//                       value={newEntry.type}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, type: e.target.value })
//                       }
//                     />
//                     <Textarea
//                       placeholder="Clinical Details"
//                       value={newEntry.details}
//                       onChange={(e) =>
//                         setNewEntry({ ...newEntry, details: e.target.value })
//                       }
//                     />
//                     <Input
//                       type="file"
//                       onChange={(e) =>
//                         setNewEntry({
//                           ...newEntry,
//                           file: e.target.files?.[0] || null,
//                         })
//                       }
//                     />
//                     <Button
//                       onClick={addMedicalEntry}
//                       className="w-full"
//                       disabled={loading}
//                     >
//                       {loading ? "Saving..." : "Save Entry"}
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             )}
//           </div>
//         </CardHeader>

//         <CardContent className="p-4">
//           <ScrollArea className="h-[600px]">
//             <div className="space-y-4">
//               {records.map((record) => (
//                 <div key={record.id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="outline">
//                           {new Date(record.date).toLocaleDateString()}
//                         </Badge>
//                         <span className="font-medium">{record.type}</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         {record.details}
//                       </p>
//                       <div className="flex items-center gap-2 text-sm">
//                         <Stethoscope className="h-4 w-4" />
//                         {record.doctor}
//                       </div>
//                     </div>
//                     {record.reportUrl && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => downloadReport(record.id)}
//                       >
//                         <Download className="mr-2 h-4 w-4" />
//                         Report
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// src/pages/dashboard/HealthRecordsTab.tsx
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore"; // Assume you have an auth context
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle, Stethoscope, FileText } from "lucide-react";
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
import axios from "axios";

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  details: string;
  doctor: string;
  fileName: string;
}

export default function HealthRecordsTab() {
  const userId = useAuthStore((state) => state.userId);
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [newEntry, setNewEntry] = useState({
    type: "",
    details: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDoctor = role === "doctor";
  const patientId = userId; // Adjust based on your patient selection logic

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        axios
          .get(
            `http://localhost:3000/api/v1/medicalRecords/patient/${patientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("data", response);
            const mappedRecords = response.data.map((record: any) => ({
              id: record._id,
              date: new Date(record.date).toLocaleDateString(),
              type: record.title,
              details: record.description,
              doctor: record.userId?.name || "Dr. Unknown",
              fileName: record.fileName,
            }));
            setRecords(mappedRecords);
          })
          .catch((err) => {
            console.log(err);
          });
        // if (!response.ok) throw new Error("Failed to fetch records");
        // const data = await response.json();
      } catch (err) {
        console.log(err);
        setError("Failed to load medical records");
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchRecords();
  }, [patientId, token, records]);

  const addMedicalEntry = async () => {
    if (!newEntry.type || !newEntry.details || !newEntry.file) {
      setError("Please fill all fields and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("doctorId", "67df2b7d16f1954c8ddba913");
    formData.append("patientId", patientId as string);
    formData.append("title", newEntry.type);
    formData.append("description", newEntry.details);
    formData.append("filePath", newEntry.file);
    formData.append("fileName", newEntry.file.name);

    try {
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      axios
        .post(
          "http://localhost:3000/api/v1/medicalRecords/create-medical-record",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // {
      //   doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      //   patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      //   filePath: { type: String, required: true },
      //   fileName: { type: String, required: true },
      //   date: { type: Date, default: Date.now },
      //   title: { type: String, required: true },
      //   description: { type: String, required: true },
      // },

      // if (!response.ok) throw new Error("Failed to create record");
      // const newRecord = await response.json();

      setRecords([
        // ...records,
        // {
        //   id: newRecord._id,
        //   date: new Date(newRecord.date).toLocaleDateString(),
        //   type: newRecord.title,
        //   details: newRecord.description,
        //   doctor: newRecord.userId?.name || "Dr. Unknown",
        //   fileName: newRecord.fileName,
        // },
      ]);
      setNewEntry({ type: "", details: "", file: null });
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to create medical entry");
    }
  };

  const downloadReport = async (recordId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/medicalRecords/${recordId}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to download file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${recordId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download report");
    }
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
            {/* {isDoctor && ( */}
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
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button onClick={addMedicalEntry} className="w-full">
                    Save Entry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* )} */}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <ScrollArea className="h-[600px]">
            {loading ? (
              <p>Loading records...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{record.date}</Badge>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReport(record.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
