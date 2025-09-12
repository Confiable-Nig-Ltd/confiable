import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import useBankingStore from "@/src/stores/banking/banking-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AddCustomerDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
    credit_limit: "",
    status: "",
  });

  const { addCustomer, isAddingCustomer } = useBankingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const result = await addCustomer(formData);

    if (result.success) {
      toast.success("Customer added successfully");
      onClose();
      setFormData({
        name: "",
        contact_person: "",
        email: "",
        phone: "",
        billing_address: "",
        shipping_address: "",
        credit_limit: "",
        status: "",
      });
    } else {
      toast.error(result.error || "Failed to add customer");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Customer</DialogTitle>
          <p className="text-sm text-gray-500">
            Enter customer details to create a new record
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Person</Label>
            <Input
              value={formData.contact_person}
              onChange={(e) => handleChange("contact_person", e.target.value)}
              placeholder="Enter Contact Person"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter Email"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Billing Address</Label>
            <Textarea
              value={formData.billing_address}
              onChange={(e) => handleChange("billing_address", e.target.value)}
              placeholder="Enter Billing Address"
              className="w-full min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Shipping Address</Label>
            <Textarea
              value={formData.shipping_address}
              onChange={(e) => handleChange("shipping_address", e.target.value)}
              placeholder="Enter Shipping Address"
              className="w-full min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Credit Limit</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.credit_limit}
              onChange={(e) => handleChange("credit_limit", e.target.value)}
              placeholder="Enter Credit Limit"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Enter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isAddingCustomer}
            >
              {isAddingCustomer ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
