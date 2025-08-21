"use client";

import { useState, useEffect } from "react";
import { useVesselStore } from "@/stores/vessel-store";
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
import { useToast } from "@/hooks/use-toast";

export function VesselForm({ vessel, onClose }) {
  const { addVessel: addVesselToStore, updateVessel } = useVesselStore();
  const { suppliers } = useContainerStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    vesselName: "",
    billOfLadingNumber: "",
    supplierId: "",
    supplierName: "",
    cargoDescription: "",
    weightVolume: "",
    unit: "tons",
    arrivalDate: "",
    totalValueUSD: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vessel) {
      setFormData({
        vesselName: vessel.vesselName,
        billOfLadingNumber: vessel.billOfLadingNumber,
        supplierId: vessel.supplierId,
        supplierName: vessel.supplierName,
        cargoDescription: vessel.cargoDescription,
        weightVolume: vessel.weightVolume.toString(),
        unit: vessel.unit,
        arrivalDate: vessel.arrivalDate.split("T")[0],
        totalValueUSD: vessel.totalValueUSD.toString(),
        notes: vessel.notes || "",
      });
    }
  }, [vessel]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vesselName.trim()) {
      newErrors.vesselName = "Vessel name is required";
    }

    if (!formData.billOfLadingNumber.trim()) {
      newErrors.billOfLadingNumber = "Bill of Lading Number is required";
    }

    if (!formData.supplierId) {
      newErrors.supplierId = "Supplier is required";
    }

    if (!formData.cargoDescription.trim()) {
      newErrors.cargoDescription = "Cargo description is required";
    }

    if (
      !formData.weightVolume ||
      isNaN(formData.weightVolume) ||
      Number.parseFloat(formData.weightVolume) <= 0
    ) {
      newErrors.weightVolume = "Valid weight/volume is required";
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = "Arrival date is required";
    }

    if (
      !formData.totalValueUSD ||
      isNaN(formData.totalValueUSD) ||
      Number.parseFloat(formData.totalValueUSD) <= 0
    ) {
      newErrors.totalValueUSD = "Valid total value is required";
    }

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

    const vesselData = {
      ...formData,
      weightVolume: Number.parseFloat(formData.weightVolume),
      totalValueUSD: Number.parseFloat(formData.totalValueUSD),
      arrivalDate: new Date(formData.arrivalDate).toISOString(),
    };

    if (vessel) {
      updateVessel(vessel.id, vesselData);
      toast({
        title: "Success",
        description: "Vessel import record updated successfully",
      });
    } else {
      addVesselToStore(vesselData);
      toast({
        title: "Success",
        description: "Vessel import record added successfully",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vesselName">Vessel Name *</Label>
          <Input
            id="vesselName"
            value={formData.vesselName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, vesselName: e.target.value }))
            }
            className={errors.vesselName ? "border-destructive" : ""}
            placeholder="Enter vessel name"
          />
          {errors.vesselName && (
            <p className="text-sm text-destructive">{errors.vesselName}</p>
          )}
        </div>

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
            placeholder="Enter bill of lading number"
          />
          {errors.billOfLadingNumber && (
            <p className="text-sm text-destructive">
              {errors.billOfLadingNumber}
            </p>
          )}
        </div>
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
        <Label htmlFor="cargoDescription">Cargo Description *</Label>
        <Textarea
          id="cargoDescription"
          value={formData.cargoDescription}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              cargoDescription: e.target.value,
            }))
          }
          className={errors.cargoDescription ? "border-destructive" : ""}
          placeholder="Describe the cargo being imported"
          rows={3}
        />
        {errors.cargoDescription && (
          <p className="text-sm text-destructive">{errors.cargoDescription}</p>
        )}
      </div>

      {/* Weight/Volume and Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weightVolume">Weight/Volume *</Label>
          <Input
            id="weightVolume"
            type="number"
            step="0.01"
            min="0"
            value={formData.weightVolume}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, weightVolume: e.target.value }))
            }
            className={errors.weightVolume ? "border-destructive" : ""}
            placeholder="Enter weight or volume"
          />
          {errors.weightVolume && (
            <p className="text-sm text-destructive">{errors.weightVolume}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select
            value={formData.unit}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, unit: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tons">Tons</SelectItem>
              <SelectItem value="cubic_meters">Cubic Meters</SelectItem>
              <SelectItem value="pieces">Pieces</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates and Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="totalValueUSD">Total Value (USD) *</Label>
          <Input
            id="totalValueUSD"
            type="number"
            step="0.01"
            min="0"
            value={formData.totalValueUSD}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                totalValueUSD: e.target.value,
              }))
            }
            className={errors.totalValueUSD ? "border-destructive" : ""}
            placeholder="Enter total value in USD"
          />
          {errors.totalValueUSD && (
            <p className="text-sm text-destructive">{errors.totalValueUSD}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="Additional notes about this vessel import"
          rows={3}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {vessel ? "Update Vessel Record" : "Save Vessel Record"}
        </Button>
      </div>
    </form>
  );
}
