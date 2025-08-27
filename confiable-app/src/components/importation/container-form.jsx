"use client";

import { useState, useEffect } from "react";
import { useContainerStore } from "@/stores/container-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContainerForm({ container, onClose }) {
  const {
    addContainer: addContainerToStore,
    updateContainer,
    suppliers,
  } = useContainerStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    billOfLadingNumber: "",
    supplierId: "",
    supplierName: "",
    shippingDate: "",
    arrivalDate: "",
    totalInvoiceValueUSD: "",
    notes: "",
    containers: [{ containerId: "", balesCount: "" }],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (container) {
      setFormData({
        billOfLadingNumber: container.billOfLadingNumber,
        supplierId: container.supplierId,
        supplierName: container.supplierName,
        shippingDate: container.shippingDate.split("T")[0],
        arrivalDate: container.arrivalDate.split("T")[0],
        totalInvoiceValueUSD: container.totalValue?.toString() || "",
        notes: container.notes || "",
        containers: container.containers || [],
      });
    }
  }, [container]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.billOfLadingNumber.trim()) {
      newErrors.billOfLadingNumber = "Bill of Lading Number is required";
    }

    if (!formData.supplierId) {
      newErrors.supplierId = "Supplier is required";
    }

    if (!formData.shippingDate) {
      newErrors.shippingDate = "Shipping Date is required";
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = "Arrival Date is required";
    }

    if (
      !formData.totalInvoiceValueUSD ||
      isNaN(formData.totalInvoiceValueUSD)
    ) {
      newErrors.totalInvoiceValueUSD = "Valid invoice value is required";
    }

    // Validate containers
    formData.containers.forEach((cont, index) => {
      if (!cont.containerId.trim()) {
        newErrors[`container_${index}_id`] = "Container ID is required";
      }
      if (!cont.balesCount || isNaN(cont.balesCount) || cont.balesCount <= 0) {
        newErrors[`container_${index}_bales`] = "Valid bales count is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    const containerData = {
      ...formData,
      totalInvoiceValueUSD: Number.parseFloat(formData.totalInvoiceValueUSD),
      containers: formData.containers.map((cont) => ({
        ...cont,
        balesCount: Number.parseInt(cont.balesCount),
        allocated: false,
        allocatedTo: [],
      })),
      shippingDate: new Date(formData.shippingDate).toISOString(),
      arrivalDate: new Date(formData.arrivalDate).toISOString(),
    };

    if (container) {
      updateContainer(container.id, containerData);
      toast({
        title: "Success",
        description: "Container record updated successfully",
      });
    } else {
      addContainerToStore(containerData);
      toast({
        title: "Success",
        description: "Container record added successfully",
      });
    }

    onClose();
  };

  const handleSupplierChange = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    setFormData((prev) => ({
      ...prev,
      supplierId,
      supplierName: supplier ? supplier.name : "",
    }));
  };

  const addContainer = () => {
    setFormData((prev) => ({
      ...prev,
      containers: [...prev.containers, { containerId: "", balesCount: "" }],
    }));
  };

  const removeContainer = (index) => {
    if (formData.containers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        containers: prev.containers.filter((_, i) => i !== index),
      }));
    }
  };

  const updateContainerField = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      containers: prev.containers.map((cont, i) =>
        i === index ? { ...cont, [field]: value } : cont
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="billOfLadingNumber">Bill of Lading Number *</Label>
          <Input
            id="billOfLadingNumber"
            value={formData.billOfLadingNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                billOfLadingNumber: e.target.value,
              }))
            }
            className={errors.billOfLadingNumber ? "border-destructive" : ""}
          />
          {errors.billOfLadingNumber && (
            <p className="text-sm text-destructive">
              {errors.billOfLadingNumber}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier *</Label>
          <Select
            value={formData.supplierId}
            onValueChange={handleSupplierChange}
          >
            <SelectTrigger
              className={errors.supplierId ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select Supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.supplierId && (
            <p className="text-sm text-destructive">{errors.supplierId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shippingDate">Shipping Date *</Label>
          <Input
            id="shippingDate"
            type="date"
            value={formData.shippingDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, shippingDate: e.target.value }))
            }
            className={errors.shippingDate ? "border-destructive" : ""}
          />
          {errors.shippingDate && (
            <p className="text-sm text-destructive">{errors.shippingDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date *</Label>
          <Input
            id="arrivalDate"
            type="date"
            value={formData.arrivalDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, arrivalDate: e.target.value }))
            }
            className={errors.arrivalDate ? "border-destructive" : ""}
          />
          {errors.arrivalDate && (
            <p className="text-sm text-destructive">{errors.arrivalDate}</p>
          )}
        </div>
      </div>

      {/* Container Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Container Details</CardTitle>
          <Button type="button" onClick={addContainer} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Container
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.containers.map((cont, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Container {index + 1}</h4>
                {formData.containers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContainer(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`containerId_${index}`}>Container ID *</Label>
                  <Input
                    id={`containerId_${index}`}
                    value={cont.containerId}
                    onChange={(e) =>
                      updateContainerField(index, "containerId", e.target.value)
                    }
                    className={
                      errors[`container_${index}_id`]
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors[`container_${index}_id`] && (
                    <p className="text-sm text-destructive">
                      {errors[`container_${index}_id`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`balesCount_${index}`}>Bales Count *</Label>
                  <Input
                    id={`balesCount_${index}`}
                    type="number"
                    min="1"
                    value={cont.balesCount}
                    onChange={(e) =>
                      updateContainerField(index, "balesCount", e.target.value)
                    }
                    className={
                      errors[`container_${index}_bales`]
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors[`container_${index}_bales`] && (
                    <p className="text-sm text-destructive">
                      {errors[`container_${index}_bales`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Invoice and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalInvoiceValueUSD">
            Total Invoice Value (USD) *
          </Label>
          <Input
            id="totalInvoiceValueUSD"
            type="number"
            step="0.01"
            min="0"
            value={formData.totalInvoiceValueUSD}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                totalInvoiceValueUSD: e.target.value,
              }))
            }
            className={errors.totalInvoiceValueUSD ? "border-destructive" : ""}
          />
          {errors.totalInvoiceValueUSD && (
            <p className="text-sm text-destructive">
              {errors.totalInvoiceValueUSD}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          rows={3}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {container ? "Update Container Record" : "Save Container Record"}
        </Button>
      </div>
    </form>
  );
}
