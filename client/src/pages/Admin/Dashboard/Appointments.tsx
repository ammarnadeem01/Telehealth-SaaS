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

export default function Appointments() {
  const [open, setOpen] = useState(false);

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
              <Input id="title" placeholder="Enter appointment title" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter details" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
