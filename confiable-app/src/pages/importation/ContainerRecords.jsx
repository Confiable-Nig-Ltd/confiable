// import React from "react";

// export default function ContainerRecords() {
//   return <div>Container Records</div>;
// }

"use client";

import { useState } from "react";
import { useContainerStore } from "@/stores/container-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Edit, Plus, Search, Trash2 } from "lucide-react";
import { ContainerForm } from "@/src/components/importation/container-form";
import { format } from "date-fns";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  arrived: "bg-blue-100 text-blue-800 border-blue-200",
  allocated: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function ContainerRecordsPage() {
  const { containers, suppliers, deleteContainer } = useContainerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContainer, setEditingContainer] = useState(null);

  const filteredContainers = containers.filter((container) => {
    const matchesSearch =
      container.billOfLadingNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      container.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || container.status === statusFilter;
    const matchesSupplier =
      supplierFilter === "all" || container.supplierId === supplierFilter;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  const handleEdit = (container) => {
    setEditingContainer(container);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this container record?")) {
      deleteContainer(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingContainer(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Bill of Lading",
      "Supplier",
      "Containers",
      "Total Bales",
      "Shipping Date",
      "Arrival Date",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredContainers.map((container) =>
        [
          container.billOfLadingNumber,
          container.supplierName,
          container.totalContainers,
          container.totalBales,
          format(new Date(container.shippingDate), "dd/MM/yyyy"),
          format(new Date(container.arrivalDate), "dd/MM/yyyy"),
          container.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "container-records.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Container Import Records</h1>
          <p className="text-muted-foreground">
            Manage and track container imports
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Container
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingContainer
                    ? "Edit Container Record"
                    : "Add New Container Record"}
                </DialogTitle>
              </DialogHeader>
              <ContainerForm
                container={editingContainer}
                onClose={handleFormClose}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Bill of Lading or Supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={supplierFilter} onValueChange={setSupplierFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Suppliers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
                <SelectItem value="allocated">Allocated</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Container Records ({filteredContainers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill of Lading No.</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-center">Containers</TableHead>
                  <TableHead className="text-center">Total Bales</TableHead>
                  <TableHead>Shipping Date</TableHead>
                  <TableHead>Arrival Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContainers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No container records found. Add your first container
                      record to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContainers.map((container) => (
                    <TableRow key={container.id}>
                      <TableCell className="font-medium">
                        {container.billOfLadingNumber}
                      </TableCell>
                      <TableCell>{container.supplierName}</TableCell>
                      <TableCell className="text-center">
                        {container.totalContainers}
                      </TableCell>
                      <TableCell className="text-center">
                        {container.totalBales.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {format(new Date(container.shippingDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(container.arrivalDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[container.status]}
                        >
                          {container.status.charAt(0).toUpperCase() +
                            container.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(container)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(container.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
