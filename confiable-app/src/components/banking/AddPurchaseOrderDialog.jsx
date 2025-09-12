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
import useBankingStore from "@/stores/banking-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddPurchaseOrderDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    supplier_id: "",
    order_date: "",
    expected_delivery_date: "",
    status: "",
    total_amount: "",
    created_by: "",
  });

  const { addPurchaseOrder, isAddingPurchaseOrder } = useBankingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await addPurchaseOrder(formData);

    if (result.success) {
      toast.success("Purchase order added successfully");
      onClose();
      setFormData({
        supplier_id: "",
        order_date: "",
        expected_delivery_date: "",
        status: "",
        total_amount: "",
        created_by: "",
      });
    } else {
      toast.error(result.error || "Failed to add purchase order");
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
          <DialogTitle className="text-2xl font-bold">
            Add Purchase Order
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Enter purchase order to create a new record
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Supplier</Label>
            <Select
              value={formData.supplier_id}
              onValueChange={(value) => handleChange("supplier_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Supplier" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => (
                  <SelectItem key={id} value={id.toString()}>
                    Supplier {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Order Date</Label>
            <Input
              type="date"
              value={formData.order_date}
              onChange={(e) => handleChange("order_date", e.target.value)}
              placeholder="Select Order Date"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Expected Delivery Date</Label>
            <Input
              type="date"
              value={formData.expected_delivery_date}
              onChange={(e) =>
                handleChange("expected_delivery_date", e.target.value)
              }
              placeholder="Select Expected Delivery Date"
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
                <SelectValue placeholder="Choose Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Ordered">Ordered</SelectItem>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Total Amount</Label>
            <Input
              type="number"
              value={formData.total_amount}
              onChange={(e) =>
                handleChange("total_amount", parseFloat(e.target.value))
              }
              placeholder="Enter Total Amount"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Created By</Label>
            <Input
              value={formData.created_by}
              onChange={(e) => handleChange("created_by", e.target.value)}
              placeholder="Enter Created By"
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isAddingPurchaseOrder}
            >
              {isAddingPurchaseOrder ? "Adding..." : "Continue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
