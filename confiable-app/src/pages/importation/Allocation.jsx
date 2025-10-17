// import React from "react";

// export default function Allocation() {
//   return <div>Allocation</div>;
// }

"use client";

import { useState } from "react";
import { useContainerStore } from "@/stores/container-store";
import { useAllocationStore } from "@/stores/allocation-store";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Package, Users, Undo2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { DollarSign as Icon } from "lucide-react";
import { AllocationDetailsDialog } from "@/src/components/banking/AllocationDetailsDialog";

// Payment Dialog Component
function PaymentDialog({ allocation, isOpen, onClose }) {
  const { addPayment } = useAllocationStore();
  const [paymentAmount, setPaymentAmount] = useState("");
  const { toast } = useToast();

  const handlePayment = () => {
    const amount = Number.parseFloat(paymentAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    const remainingAmount =
      allocation.totalAmount - (allocation.amountPaid || 0);
    if (amount > remainingAmount) {
      toast({
        title: "Invalid Amount",
        description: "Payment amount cannot exceed the remaining balance",
        variant: "destructive",
      });
      return;
    }

    addPayment(allocation.id, amount);
    toast({
      title: "Success",
      description: "Payment recorded successfully",
    });
    setPaymentAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Record a payment for the allocation to {allocation?.employeeName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Total Amount</Label>
              <div className="font-medium">
                ₦{(allocation?.totalAmount || 0).toLocaleString()}
              </div>
            </div>
            <div>
              <Label>Amount Paid</Label>
              <div className="font-medium">
                ₦{(allocation?.amountPaid || 0).toLocaleString()}
              </div>
            </div>
            <div>
              <Label>Remaining Balance</Label>
              <div className="font-medium">
                ₦
                {(
                  (allocation?.totalAmount || 0) - (allocation?.amountPaid || 0)
                ).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Payment Amount *</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter payment amount"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>Record Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AllocationPage() {
  const { containers, updateContainer } = useContainerStore();
  const {
    employees,
    allocations,
    addAllocation,
    reverseAllocation,
    getEmployeeById,
  } = useAllocationStore();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [allocationType, setAllocationType] = useState("partial");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [balesToAllocate, setBalesToAllocate] = useState("");
  const [pricePerBale, setPricePerBale] = useState("");
  const [notes, setNotes] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // Get available containers (arrived or pending status)
  const availableContainers = containers
    .filter(
      (container) =>
        container.status === "arrived" || container.status === "pending"
    )
    .filter(
      (container) =>
        container.billOfLadingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        container.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Get recent allocations for history
  const recentAllocations = allocations
    .filter((allocation) => allocation.status === "active")
    .sort((a, b) => new Date(b.allocationDate) - new Date(a.allocationDate))
    .slice(0, 10);

  const handleContainerSelect = (container) => {
    setSelectedContainer(container);
    setBalesToAllocate("");
    setSelectedEmployeeId("");
    setNotes("");
  };

  const handleAllocation = () => {
    if (!selectedContainer || !selectedEmployeeId) {
      toast({
        title: "Validation Error",
        description: "Please select a container and employee",
        variant: "destructive",
      });
      return;
    }

    const balesCount = Number.parseInt(balesToAllocate);
    if (!balesCount || balesCount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid number of bales",
        variant: "destructive",
      });
      return;
    }

    const price = Number.parseFloat(pricePerBale);
    if (!price || price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid price per bale",
        variant: "destructive",
      });
      return;
    }

    const availableBales = selectedContainer.totalBales;
    if (balesCount > availableBales) {
      toast({
        title: "Validation Error",
        description: `Cannot allocate more than ${availableBales} available bales`,
        variant: "destructive",
      });
      return;
    }

    const employee = getEmployeeById(selectedEmployeeId);

    // Create allocation record
    addAllocation({
      containerRecordId: selectedContainer.id,
      billOfLadingNumber: selectedContainer.billOfLadingNumber,
      employeeId: selectedEmployeeId,
      employeeName: employee.name,
      balesAllocated: balesCount,
      allocationType: allocationType,
      pricePerBale: Number.parseFloat(pricePerBale),
      notes: notes,
      allocatedBy: "current-user", // In real app, this would be the logged-in user
    });

    // Update container status if fully allocated
    if (allocationType === "full" || balesCount === availableBales) {
      updateContainer(selectedContainer.id, { status: "allocated" });
    }

    toast({
      title: "Success",
      description: `Successfully allocated ${balesCount} bales to ${employee.name}`,
    });

    // Reset form
    setSelectedContainer(null);
    setBalesToAllocate("");
    setSelectedEmployeeId("");
    setNotes("");
    setAllocationType("partial");
  };

  const handleReverseAllocation = (allocationId) => {
    if (confirm("Are you sure you want to reverse this allocation?")) {
      reverseAllocation(allocationId);
      toast({
        title: "Success",
        description: "Allocation reversed successfully",
      });
    }
  };

  const getContainerStatusBadge = (container) => {
    const allocated = allocations
      .filter(
        (a) => a.containerRecordId === container.id && a.status === "active"
      )
      .reduce((sum, a) => sum + a.balesAllocated, 0);

    if (allocated === 0) {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          Available
        </Badge>
      );
    } else if (allocated < container.totalBales) {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          Partially Allocated
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-800 border-gray-200"
        >
          Fully Allocated
        </Badge>
      );
    }
  };

  const getAvailableBales = (container) => {
    const allocated = allocations
      .filter(
        (a) => a.containerRecordId === container.id && a.status === "active"
      )
      .reduce((sum, a) => sum + a.balesAllocated, 0);
    return container.totalBales - allocated;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Container Allocation
        </h1>
        <p className="text-muted-foreground">
          Allocate containers to employees and manage stock distribution
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Available Containers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Available Containers
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
            {availableContainers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No available containers found. Import containers first to
                allocate them.
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
                    {getContainerStatusBadge(container)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Supplier: {container.supplierName}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {container.totalContainers} Containers
                    </span>
                    <span>
                      {getAvailableBales(container).toLocaleString()} /{" "}
                      {container.totalBales.toLocaleString()} Bales Available
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Allocation Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedContainer
                ? `Allocate: ${selectedContainer.billOfLadingNumber}`
                : "Select a Container"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContainer ? (
              <div className="space-y-6">
                {/* Container Details */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Container Details:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      Total Bales:{" "}
                      {selectedContainer.totalBales.toLocaleString()}
                    </div>
                    <div>
                      Available:{" "}
                      {getAvailableBales(selectedContainer).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Allocation Type */}
                <div className="space-y-3">
                  <Label>Allocation Type</Label>
                  <RadioGroup
                    value={allocationType}
                    onValueChange={setAllocationType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full">
                        Full Allocation (entire container)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="partial" />
                      <Label htmlFor="partial">
                        Partial Allocation (specific quantity)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Employee Selection */}
                <div className="space-y-2">
                  <Label>Employee *</Label>
                  <Select
                    value={selectedEmployeeId}
                    onValueChange={setSelectedEmployeeId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{employee.name}</span>
                            <span className="text-muted-foreground ml-2">
                              Current: {employee.currentStock.toLocaleString()}{" "}
                              bales
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedEmployeeId && (
                    <p className="text-sm text-muted-foreground">
                      Current Stock:{" "}
                      {getEmployeeById(
                        selectedEmployeeId
                      )?.currentStock.toLocaleString()}{" "}
                      bales
                    </p>
                  )}
                </div>

                {/* Bales to Allocate */}
                <div className="space-y-2">
                  <Label>Bales to Allocate *</Label>
                  <Input
                    type="number"
                    min="1"
                    max={
                      allocationType === "full"
                        ? selectedContainer.totalBales
                        : getAvailableBales(selectedContainer)
                    }
                    value={
                      allocationType === "full"
                        ? getAvailableBales(selectedContainer)
                        : balesToAllocate
                    }
                    onChange={(e) => setBalesToAllocate(e.target.value)}
                    disabled={allocationType === "full"}
                    placeholder={`Max: ${getAvailableBales(
                      selectedContainer
                    ).toLocaleString()}`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Available:{" "}
                    {getAvailableBales(selectedContainer).toLocaleString()}{" "}
                    bales
                  </p>
                </div>

                {/* Notes */}
                {/* Price per Bale */}
                <div className="space-y-2">
                  <Label>Price per Bale *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={pricePerBale}
                    onChange={(e) => setPricePerBale(e.target.value)}
                    placeholder="Enter price per bale"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes about this allocation"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedContainer(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAllocation} className="flex-1">
                    Allocate to Employee
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  Select a container from the left panel to start allocation
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Allocation History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Container/BL Number</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Bales Allocated</TableHead>
                  <TableHead>Price/Bale</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAllocations.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No allocations found. Start allocating containers to see
                      history here.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentAllocations.map((allocation) => (
                    <TableRow
                      key={allocation.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={(e) => {
                        // Don't show details if clicking on action buttons
                        if (e.target.closest(".action-button")) return;
                        setSelectedAllocation(allocation);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <TableCell>
                        {format(
                          new Date(allocation.allocationDate),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {allocation.billOfLadingNumber}
                      </TableCell>
                      <TableCell>{allocation.employeeName}</TableCell>
                      <TableCell>
                        {allocation.balesAllocated.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₦{allocation.pricePerBale?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₦{(allocation.totalAmount || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₦{(allocation.amountPaid || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            allocation.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : allocation.paymentStatus === "partial"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {allocation.paymentStatus?.charAt(0).toUpperCase() +
                            allocation.paymentStatus?.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {allocation.allocationType.charAt(0).toUpperCase() +
                            allocation.allocationType.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-48">
                        <div className="truncate" title={allocation.notes}>
                          {allocation.notes || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="action-button"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              setSelectedAllocation(allocation);
                              setShowPaymentDialog(true);
                            }}
                          >
                            <DollarSign className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="action-button text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleReverseAllocation(allocation.id);
                            }}
                          >
                            <Undo2 className="h-4 w-4" />
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

      {/* Payment Dialog */}
      {showPaymentDialog && selectedAllocation && (
        <PaymentDialog
          allocation={selectedAllocation}
          isOpen={showPaymentDialog}
          onClose={() => {
            setShowPaymentDialog(false);
            setSelectedAllocation(null);
          }}
        />
      )}

      {/* Details Dialog */}
      {showDetailsDialog && selectedAllocation && (
        <AllocationDetailsDialog
          allocation={selectedAllocation}
          isOpen={showDetailsDialog}
          onClose={() => {
            setShowDetailsDialog(false);
            setSelectedAllocation(null);
          }}
        />
      )}
    </div>
  );
}
