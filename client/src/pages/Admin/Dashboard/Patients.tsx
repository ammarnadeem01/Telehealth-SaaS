// src/pages/Patients.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Patients.tsx
export default function Patients() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Patient Records</h1>
        <Button>New Patient</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
          <CardDescription>Last 30 days registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-4">
            <p className="text-sm text-muted-foreground">No recent patients</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
