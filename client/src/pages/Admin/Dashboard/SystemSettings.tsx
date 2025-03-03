// src/pages/admin/SystemSettings.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SystemSettings() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin users
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Audit Log Retention</Label>
              <p className="text-sm text-muted-foreground">
                Keep audit logs for 365 days
              </p>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 p-4 border border-destructive rounded-lg">
            <div>
              <Label className="text-destructive">Delete All Data</Label>
              <p className="text-sm text-muted-foreground">
                Permanently remove all data from the system
              </p>
            </div>
            <Button variant="destructive">Delete All Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
