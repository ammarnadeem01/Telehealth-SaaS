import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define form structure
interface FormData {
  title: string;
  date: string;
  startTime: string;
  duration: string;
  description: string;
}

// Define transformed API request structure
interface AppointmentData {
  name: string;
  participants: string[];
  status: string;
  type: string;
  notes: string;
  paymentStatus: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

export default function Appointments() {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    startTime: "",
    duration: "30",
    description: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.startTime) {
      alert("Please fill in all required fields.");
      return;
    }

    // Calculate end time based on duration
    const [hours, minutes] = formData.startTime.split(":").map(Number);
    const endDateTime = new Date(formData.date);
    endDateTime.setHours(hours, minutes + parseInt(formData.duration, 10));
    const formattedEndTime = endDateTime.toTimeString().slice(0, 5);

    const transformedData: AppointmentData = {
      name: formData.title,
      participants: ["nadeemammar04@gmail.com", "nadeemammar04@gmail.com"],
      status: "scheduled",
      type: "video",
      notes: formData.description,
      paymentStatus: "pending",
      startTime: `${formData.date} ${formData.startTime}`,
      endTime: `${formData.date} ${formattedEndTime}`,
      timezone: "Asia/Karachi",
    };

    try {
      console.log("Submitting:", transformedData);
      const response = await fetch(
        "http://localhost:3000/api/v1/appointment/create-appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transformedData),
        }
      );

      if (response.ok) {
        alert("Appointment scheduled successfully!");
        setOpen(false);
        setFormData({
          title: "",
          date: "",
          startTime: "",
          duration: "30",
          description: "",
        });
      } else {
        alert("Failed to schedule appointment.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Appointments</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no appointments
          </h3>
          <p className="text-sm text-muted-foreground">
            Start scheduling appointments by clicking the button below.
          </p>
          <Button className="mt-4" onClick={() => setOpen(true)}>
            Add Appointment
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details to add an appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter appointment title"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="duration">Duration</Label>
              <select
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">30 mins</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter details"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
