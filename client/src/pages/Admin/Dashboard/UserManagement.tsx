// src/pages/admin/UserManagement.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, User, Shield, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "patient",
      status: "active",
    },
    {
      id: 2,
      name: "Dr. Sarah",
      email: "sarah@clinic.com",
      role: "doctor",
      status: "pending",
    },
    {
      id: 3,
      name: "Admin",
      email: "admin@system.com",
      role: "admin",
      status: "active",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="gap-2 bg-blue-500">
          <Plus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className={`${
                  selectedRole === "all"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedRole("all")}
              >
                All
              </Button>
              <Button
                className={`${
                  selectedRole === "patient"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedRole("patient")}
              >
                Patients
              </Button>
              <Button
                className={`${
                  selectedRole === "doctor"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedRole("doctor")}
              >
                Doctors
              </Button>
              <Button
                className={`${
                  selectedRole === "admin"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedRole("admin")}
              >
                Admins
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "destructive"
                          : user.role === "doctor"
                          ? "default"
                          : "outline"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
