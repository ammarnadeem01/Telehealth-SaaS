// src/pages/admin/MedicalResources.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  FileText,
  Stethoscope,
  Pencil,
  Trash,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MedicalResource {
  id: number;
  title: string;
  category: string;
  status: "published" | "draft" | "archived";
  lastUpdated: string;
}

export function MedicalResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["guidelines", "protocols", "research", "education"];

  const resources: MedicalResource[] = [
    {
      id: 1,
      title: "COVID-19 Treatment Guidelines",
      category: "guidelines",
      status: "published",
      lastUpdated: "2024-03-15",
    },
    {
      id: 2,
      title: "Diabetes Management Protocol",
      category: "protocols",
      status: "draft",
      lastUpdated: "2024-03-18",
    },
    {
      id: 3,
      title: "Cardiac Emergency Procedures",
      category: "protocols",
      status: "published",
      lastUpdated: "2024-03-20",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Medical Resources</h1>
        <Button className="gap-2 bg-blue-500">
          <Plus className="h-4 w-4" />
          Add New Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  className={`${
                    selectedCategory == category ? "bg-blue-500" : "bg-red-900"
                  }`}
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div> */}
            <div className="flex gap-2 flex-wrap">
              {/* "All Categories" Button */}
              <Button
                className={`${
                  selectedCategory === "all"
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
                variant="outline"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>

              {/* Category Buttons */}
              {categories.map((category) => (
                <Button
                  key={category}
                  className={`${
                    selectedCategory === category
                      ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                  }`}
                  variant="outline"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {resource.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resource.status === "published"
                          ? "default"
                          : resource.status === "draft"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{resource.lastUpdated}</TableCell>
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
