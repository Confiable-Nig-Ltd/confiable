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

export function AddStockTransactionDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    product: "",
    transaction_type: "",
    quantity: "",
    source: "",
    destination: "",
    transaction_date: "",
    performed_by: "",
    reference_note: "",
  });

  const { addStockTransaction, isAddingStockTransaction } = useBankingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await addStockTransaction(formData);

    if (result.success) {
      toast.success("Stock transaction added successfully");
      onClose();
      setFormData({
        product: "",
        transaction_type: "",
        quantity: "",
        source: "",
        destination: "",
        transaction_date: "",
        performed_by: "",
        reference_note: "",
      });
    } else {
      toast.error(result.error || "Failed to add stock transaction");
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
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Stock Transaction
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Enter stock transaction to create a new record
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Product</Label>
            <Select
              value={formData.product}
              onValueChange={(value) => handleChange("product", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
                  <SelectItem key={id} value={id.toString()}>
                    Product {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Select
              value={formData.transaction_type}
              onValueChange={(value) => handleChange("transaction_type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Job Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Purchase">Purchase</SelectItem>
                <SelectItem value="Sale">Sale</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
                <SelectItem value="Return">Return</SelectItem>
                <SelectItem value="Adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              placeholder="Enter Quantity"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value) => handleChange("source", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Destination</Label>
            <Select
              value={formData.destination}
              onValueChange={(value) => handleChange("destination", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Transaction Date</Label>
            <Input
              type="date"
              value={formData.transaction_date}
              onChange={(e) => handleChange("transaction_date", e.target.value)}
              placeholder="Choose Transaction Date"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Performed By</Label>
            <Select
              value={formData.performed_by}
              onValueChange={(value) => handleChange("performed_by", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Performed By" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
                  <SelectItem key={id} value={id.toString()}>
                    User {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reference Note</Label>
            <Input
              value={formData.reference_note}
              onChange={(e) => handleChange("reference_note", e.target.value)}
              placeholder="Enter Reference Note"
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isAddingStockTransaction}
            >
              {isAddingStockTransaction ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
