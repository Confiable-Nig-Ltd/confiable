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

export function AddSalesOrderDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    customer_id: "",
    order_date: "",
    delivery_date: "",
    status: "",
    total_amount: "",
    payment_status: "",
    created_by: "",
  });

  const { addSalesOrder, isAddingSalesOrder } = useBankingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await addSalesOrder(formData);

    if (result.success) {
      toast.success("Sales order added successfully");
      onClose();
      setFormData({
        customer_id: "",
        order_date: "",
        delivery_date: "",
        status: "",
        total_amount: "",
        payment_status: "",
        created_by: "",
      });
    } else {
      toast.error(result.error || "Failed to add sales order");
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
            Add Sales Order
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Enter sales order to create a new record
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Customer</Label>
            <Select
              value={formData.customer_id}
              onValueChange={(value) => handleChange("customer_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Find Customer" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => (
                  <SelectItem key={id} value={id.toString()}>
                    Customer {id}
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
              placeholder="Enter Order Date"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Delivery Date</Label>
            <Input
              type="date"
              value={formData.delivery_date}
              onChange={(e) => handleChange("delivery_date", e.target.value)}
              placeholder="Enter Delivery Date"
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
            <Label>Payment Status</Label>
            <Select
              value={formData.payment_status}
              onValueChange={(value) => handleChange("payment_status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
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
              disabled={isAddingSalesOrder}
            >
              {isAddingSalesOrder ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
