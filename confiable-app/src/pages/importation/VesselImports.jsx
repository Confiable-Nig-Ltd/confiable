// import React from "react";

// export default function VesselImports() {
//   return <div>Vessel Imports</div>;
// }

"use client";

import { useState } from "react";
import { useVesselStore } from "@/stores/vessel-store";
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
import { Download, Edit, Plus, Search, Trash2, Ship } from "lucide-react";
import { VesselForm } from "@/src/components/importation/vessel-form";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/date-utils";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  arrived: "bg-blue-100 text-blue-800 border-blue-200",
  cleared: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
};

const unitLabels = {
  tons: "Tons",
  cubic_meters: "Cubic Meters",
  pieces: "Pieces",
};

export default function VesselImportsPage() {
  const { vessels, deleteVessel } = useVesselStore();
  const { suppliers } = useContainerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVessel, setEditingVessel] = useState(null);

  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch =
      vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.billOfLadingNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vessel.cargoDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vessel.status === statusFilter;
    const matchesSupplier =
      supplierFilter === "all" || vessel.supplierId === supplierFilter;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  const handleEdit = (vessel) => {
    setEditingVessel(vessel);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this vessel import record?")) {
      deleteVessel(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingVessel(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Vessel Name",
      "Bill of Lading",
      "Supplier",
      "Cargo Description",
      "Weight/Volume",
      "Unit",
      "Arrival Date",
      "Total Value (USD)",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredVessels.map((vessel) =>
        [
          vessel.vesselName,
          vessel.billOfLadingNumber,
          vessel.supplierName,
          `"${vessel.cargoDescription}"`,
          vessel.weightVolume,
          unitLabels[vessel.unit],
          format(new Date(vessel.arrivalDate), "dd/MM/yyyy"),
          vessel.totalValueUSD,
          vessel.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vessel-imports.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Ship className="h-8 w-8" />
            Vessel Import Records
          </h1>
          <p className="text-muted-foreground">
            Manage and track vessel-based imports
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
                Add New Vessel Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVessel
                    ? "Edit Vessel Import Record"
                    : "Add New Vessel Import Record"}
                </DialogTitle>
              </DialogHeader>
              <VesselForm vessel={editingVessel} onClose={handleFormClose} />
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
                  placeholder="Search by vessel name, bill of lading, or cargo..."
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
                <SelectItem value="cleared">Cleared</SelectItem>
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
            Vessel Import Records ({filteredVessels.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vessel Name</TableHead>
                  <TableHead>Bill of Lading</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Cargo Description</TableHead>
                  <TableHead>Weight/Volume</TableHead>
                  <TableHead>Arrival Date</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVessels.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No vessel import records found. Add your first vessel
                      import to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVessels.map((vessel) => (
                    <TableRow key={vessel.id}>
                      <TableCell className="font-medium">
                        {vessel.vesselName}
                      </TableCell>
                      <TableCell>{vessel.billOfLadingNumber}</TableCell>
                      <TableCell>{vessel.supplierName}</TableCell>
                      <TableCell className="max-w-48">
                        <div
                          className="truncate"
                          title={vessel.cargoDescription}
                        >
                          {vessel.cargoDescription}
                        </div>
                      </TableCell>
                      <TableCell>
                        {vessel.weightVolume.toLocaleString()}{" "}
                        {unitLabels[vessel.unit]}
                      </TableCell>
                      <TableCell>
                        {format(new Date(vessel.arrivalDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(vessel.totalValueUSD)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[vessel.status]}
                        >
                          {vessel.status.charAt(0).toUpperCase() +
                            vessel.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(vessel)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(vessel.id)}
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
