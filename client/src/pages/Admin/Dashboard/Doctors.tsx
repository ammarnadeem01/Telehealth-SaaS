// src/pages/Doctors.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function Doctors() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Medical Staff</h1>
        <Button>Add Doctor</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dr. Sarah Johnson</CardTitle>
            <CardDescription>Cardiologist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Availability</span>
              <Badge variant="outline">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
