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

export function AddAccountDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    account_name: "",
    account_type: "",
    parent_account_id: "",
    status: "",
  });

  const { accounts, addAccount, isAddingAccount } = useBankingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await addAccount(formData);

    if (result.success) {
      toast.success("Account added successfully");
      onClose();
      setFormData({
        account_name: "",
        account_type: "",
        parent_account_id: "",
        status: "",
      });
    } else {
      toast.error(result.error || "Failed to add account");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get list of accounts that can be parents (all active accounts)
  const potentialParents = accounts.filter((acc) => acc.is_active);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Account</DialogTitle>
          <p className="text-sm text-gray-500">
            Enter sales order to create a new record
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Account Name</Label>
            <Input
              value={formData.account_name}
              onChange={(e) => handleChange("account_name", e.target.value)}
              placeholder="Enter Account Name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select
              value={formData.account_type}
              onValueChange={(value) => handleChange("account_type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asset">Asset</SelectItem>
                <SelectItem value="Liability">Liability</SelectItem>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="Revenue">Revenue</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Parent Account</Label>
            <Select
              value={formData.parent_account_id}
              onValueChange={(value) =>
                handleChange("parent_account_id", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Parent Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                {potentialParents.map((acc) => (
                  <SelectItem
                    key={acc.account_id}
                    value={acc.account_id.toString()}
                  >
                    {acc.account_name} ({acc.account_code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isAddingAccount}
            >
              {isAddingAccount ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
