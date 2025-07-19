"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useInvoice } from "@/contexts/invoice-context";

export function InvoiceFormModal() {
  const { isCreateModalOpen, closeCreateModal, addInvoice } = useInvoice();
  const [date, setDate] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customerName: "",
      product: "",
      quantity: "",
      price: "",
      tax: "",
      discount: "",
    },
  });

  const onFormSubmit = (data) => {
    const formData = {
      ...data,
      dueDate: date,
      quantity: Number.parseInt(data.quantity),
      price: Number.parseFloat(data.price),
      tax: Number.parseFloat(data.tax),
      discount: Number.parseFloat(data.discount),
    };
    addInvoice(formData);
    reset();
    setDate(undefined);
  };

  const handleClose = () => {
    reset();
    setDate(undefined);
    closeCreateModal();
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Create New Invoice
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="text-sm text-gray-600 mb-4">
          Enter invoice information to create a new record
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter Customer Name"
              {...register("customerName", {
                required: "Customer name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={errors.customerName ? "border-red-500" : ""}
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Input
              id="product"
              placeholder="Enter Product Name"
              {...register("product", {
                required: "Product name is required",
                minLength: {
                  value: 2,
                  message: "Product name must be at least 2 characters",
                },
              })}
              className={errors.product ? "border-red-500" : ""}
            />
            {errors.product && (
              <p className="text-sm text-red-500">{errors.product.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter Quantity Amount"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter Price"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax">Tax</Label>
            <Input
              id="tax"
              type="number"
              step="0.01"
              placeholder="Enter Tax Amount"
              {...register("tax", {
                required: "Tax is required",
                min: { value: 0, message: "Tax cannot be negative" },
              })}
              className={errors.tax ? "border-red-500" : ""}
            />
            {errors.tax && (
              <p className="text-sm text-red-500">{errors.tax.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              step="0.01"
              placeholder="Enter Discount Amount"
              {...register("discount", {
                min: { value: 0, message: "Discount cannot be negative" },
              })}
              className={errors.discount ? "border-red-500" : ""}
            />
            {errors.discount && (
              <p className="text-sm text-red-500">{errors.discount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Choose Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!date}
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
