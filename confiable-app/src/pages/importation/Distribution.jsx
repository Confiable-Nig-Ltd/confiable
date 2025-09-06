// import React from "react";

// export default function Distribution() {
//   return <div>Distribution</div>;
// }

"use client";

import { useState, useEffect } from "react";
import { useContainerStore } from "@/stores/container-store";
import { useAllocationStore } from "@/stores/allocation-store";
import { useDistributionStore } from "@/stores/distribution-store";
// Node environment from Vite config
const VITE_NODE_ENV = import.meta.env.MODE;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, Share2, Plus, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import DistributionDetailsDialog from "@/src/components/importation/DistributionDetailsDialog";

export default function DistributionPage() {
  const { containers } = useContainerStore();
  const { employees, getEmployeeById } = useAllocationStore();
  const { addDistribution, getDistributionHistory } = useDistributionStore();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [employeeDistributions, setEmployeeDistributions] = useState([
    { employeeId: "", balesReceived: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDistribution, setSelectedDistribution] = useState(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const availableContainers = isHydrated
    ? containers
        .filter(
          (container) =>
            container.status === "allocated" || container.status === "arrived"
        )
        .filter(
          (container) =>
            container.billOfLadingNumber
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            container.supplierName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
    : [];

  const distributionHistory = getDistributionHistory();

  const handleContainerSelect = (container) => {
    setSelectedContainer(container);
    setEmployeeDistributions([{ employeeId: "", balesReceived: "" }]);
    setNotes("");
  };

  const addEmployeeDistribution = () => {
    setEmployeeDistributions([
      ...employeeDistributions,
      { employeeId: "", balesReceived: "" },
    ]);
  };

  const removeEmployeeDistribution = (index) => {
    if (employeeDistributions.length > 1) {
      setEmployeeDistributions(
        employeeDistributions.filter((_, i) => i !== index)
      );
    }
  };

  const updateEmployeeDistribution = (index, field, value) => {
    const updated = employeeDistributions.map((dist, i) =>
      i === index ? { ...dist, [field]: value } : dist
    );
    setEmployeeDistributions(updated);
  };

  const getTotalDistributed = () => {
    return employeeDistributions.reduce((sum, dist) => {
      const bales = Number.parseInt(dist.balesReceived) || 0;
      return sum + bales;
    }, 0);
  };

  const getRemainingBales = () => {
    if (!selectedContainer) return 0;
    return selectedContainer.totalBales - getTotalDistributed();
  };

  const validateDistribution = () => {
    if (!selectedContainer) {
      toast({
        title: "Validation Error",
        description: "Please select a container",
        variant: "destructive",
      });
      return false;
    }

    const validDistributions = employeeDistributions.filter(
      (dist) =>
        dist.employeeId &&
        dist.balesReceived &&
        Number.parseInt(dist.balesReceived) > 0
    );

    if (validDistributions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one employee with valid bales count",
        variant: "destructive",
      });
      return false;
    }

    const totalDistributed = getTotalDistributed();
    if (totalDistributed > selectedContainer.totalBales) {
      toast({
        title: "Validation Error",
        description: `Total distributed (${totalDistributed}) exceeds available bales (${selectedContainer.totalBales})`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDistribution = () => {
    if (!validateDistribution()) return;

    const validDistributions = employeeDistributions
      .filter(
        (dist) =>
          dist.employeeId &&
          dist.balesReceived &&
          Number.parseInt(dist.balesReceived) > 0
      )
      .map((dist) => {
        const employee = getEmployeeById(dist.employeeId);
        const balesReceived = Number.parseInt(dist.balesReceived);
        return {
          employeeId: dist.employeeId,
          employeeName: employee.name,
          balesReceived: balesReceived,
          previousStock: employee.currentStock,
          newStock: employee.currentStock + balesReceived,
        };
      });

    const distributionData = {
      containerRecordId: selectedContainer.id,
      billOfLadingNumber: selectedContainer.billOfLadingNumber,
      distributions: validDistributions,
      notes: notes,
      distributedBy: "current-user", // In real app, this would be the logged-in user
    };

    addDistribution(distributionData);

    toast({
      title: "Success",
      description: `Successfully distributed ${getTotalDistributed()} bales among ${
        validDistributions.length
      } employees`,
    });

    // Reset form
    setSelectedContainer(null);
    setEmployeeDistributions([{ employeeId: "", balesReceived: "" }]);
    setNotes("");
  };

  const clearForm = () => {
    setEmployeeDistributions([{ employeeId: "", balesReceived: "" }]);
    setNotes("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Share2 className="h-8 w-8" />
          Stock Distribution
        </h1>
        <p className="text-muted-foreground">
          Distribute container stock among multiple employees
        </p>
        {VITE_NODE_ENV === "development" && (
          <p className="text-xs text-muted-foreground mt-2">
            Debug: {containers.length} total containers,{" "}
            {availableContainers.length} available for distribution
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Container Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Select Container ({availableContainers.length} available)
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search containers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {!isHydrated ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading containers...
              </div>
            ) : availableContainers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No containers available for distribution.</p>
                <p className="text-xs mt-2">
                  Containers must have "arrived" or "allocated" status.
                </p>
              </div>
            ) : (
              availableContainers.map((container) => (
                <div
                  key={container.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedContainer?.id === container.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleContainerSelect(container)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">
                      BL: {container.billOfLadingNumber}
                    </h4>
                    <Badge
                      variant="outline"
                      className={
                        container.status === "arrived"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {container.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Supplier: {container.supplierName}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {container.totalContainers} Containers
                    </span>
                    <span className="font-medium text-primary">
                      {container.totalBales.toLocaleString()} Bales
                    </span>
                  </div>
                  {container.notes && (
                    <p className="text-xs text-muted-foreground mt-2 truncate">
                      {container.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Center Panel - Distribution Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedContainer
                ? `Distribute: ${selectedContainer.billOfLadingNumber}`
                : "Select a Container"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContainer ? (
              <div className="space-y-6">
                {/* Container Info */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Container Info:</h4>
                  <div className="text-sm">
                    Total Bales: {selectedContainer.totalBales.toLocaleString()}
                  </div>
                </div>

                {/* Employee Distribution */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Employee Distribution:
                    </Label>
                    <Button
                      type="button"
                      onClick={addEmployeeDistribution}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>

                  {employeeDistributions.map((dist, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Employee {index + 1}</h5>
                        {employeeDistributions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmployeeDistribution(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Employee</Label>
                          <Select
                            value={dist.employeeId}
                            onValueChange={(value) =>
                              updateEmployeeDistribution(
                                index,
                                "employeeId",
                                value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Employee" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map((employee) => (
                                <SelectItem
                                  key={employee.id}
                                  value={employee.id}
                                >
                                  {employee.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Bales to Receive</Label>
                          <Input
                            type="number"
                            min="1"
                            value={dist.balesReceived}
                            onChange={(e) =>
                              updateEmployeeDistribution(
                                index,
                                "balesReceived",
                                e.target.value
                              )
                            }
                            placeholder="Enter bales count"
                          />
                        </div>
                      </div>

                      {dist.employeeId && (
                        <div className="text-sm text-muted-foreground">
                          Current:{" "}
                          {getEmployeeById(
                            dist.employeeId
                          )?.currentStock.toLocaleString()}{" "}
                          → New:{" "}
                          {(
                            getEmployeeById(dist.employeeId)?.currentStock +
                            (Number.parseInt(dist.balesReceived) || 0)
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Distribution Summary */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Distributed:</span>
                    <span className="font-medium">
                      {getTotalDistributed().toLocaleString()}/
                      {selectedContainer.totalBales.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining:</span>
                    <span
                      className={`font-medium ${
                        getRemainingBales() < 0 ? "text-destructive" : ""
                      }`}
                    >
                      {getRemainingBales().toLocaleString()} bales
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes about this distribution"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={clearForm}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Clear
                  </Button>
                  <Button onClick={handleDistribution} className="flex-1">
                    Distribute Stock
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  Select a container from the left panel to start distribution
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Distribution Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContainer &&
            employeeDistributions.some(
              (dist) => dist.employeeId && dist.balesReceived
            ) ? (
              <div className="space-y-4">
                <div className="text-sm font-medium">Preview Distribution:</div>
                {employeeDistributions
                  .filter((dist) => dist.employeeId && dist.balesReceived)
                  .map((dist, index) => {
                    const employee = getEmployeeById(dist.employeeId);
                    const bales = Number.parseInt(dist.balesReceived) || 0;
                    return (
                      <div
                        key={index}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="font-medium">{employee?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Receiving: {bales.toLocaleString()} bales
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stock: {employee?.currentStock.toLocaleString()} →{" "}
                          {(employee?.currentStock + bales).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-sm">
                  Distribution preview will appear here
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Distribution History */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distribution Date</TableHead>
                  <TableHead>Container/BL Number</TableHead>
                  <TableHead>Employees Involved</TableHead>
                  <TableHead>Total Distributed</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distributionHistory.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No distributions found. Start distributing stock to see
                      history here.
                    </TableCell>
                  </TableRow>
                ) : (
                  distributionHistory.map((distribution) => (
                    <TableRow key={distribution.id}>
                      <TableCell>
                        {format(
                          new Date(distribution.distributionDate),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {distribution.billOfLadingNumber}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {distribution.distributions.map((dist, index) => (
                            <div key={index} className="text-sm">
                              {dist.employeeName}:{" "}
                              {dist.balesReceived.toLocaleString()} bales
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {distribution.totalDistributed.toLocaleString()}
                      </TableCell>
                      <TableCell className="max-w-48">
                        <div className="truncate" title={distribution.notes}>
                          {distribution.notes || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDistribution(distribution);
                            setDetailsDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Details Dialog */}
      <DistributionDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        distribution={selectedDistribution}
      />
    </div>
  );
}
