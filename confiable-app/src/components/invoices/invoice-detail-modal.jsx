"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useInvoice } from "@/contexts/invoice-context";

export function InvoiceDetailModal() {
  const { isDetailModalOpen, closeDetailModal, selectedInvoice } = useInvoice();

  if (!selectedInvoice) return null;

  const subtotal = selectedInvoice.price * selectedInvoice.quantity;
  const taxAmount = (subtotal * 10) / 100;
  const discountAmount = (subtotal * 5) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount;

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={closeDetailModal}>
      <DialogContent className="sm:max-w-lg max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 z-10 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold text-sm">Confiable</span>
            <span className="text-xs text-gray-500">Nigeria Limited</span>
          </div>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-xs text-gray-600">001</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">30,September, 2025</p>
            </div>
          </div>

          <div className="border-t-2 border-blue-600 pt-3">
            <div className="mb-3">
              <p className="text-xs text-blue-600 font-medium">INVOICE TO</p>
              <h2 className="text-base font-bold">{selectedInvoice.name}</h2>
              <p className="text-xs text-gray-600">
                Account Officer, Main Warehouse
              </p>
              <p className="text-xs text-gray-600">Lagos Industrial Estate</p>
              <p className="text-xs text-gray-600">08122233344</p>
            </div>

            <div className="bg-gray-50 rounded p-3">
              <div className="grid grid-cols-12 gap-3 mb-2">
                <div className="col-span-6 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Product Description
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Price
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Quantity
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Total
                </div>
              </div>

              <div className="max-h-[200px] overflow-y-auto">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="col-span-6">
                      <p className="text-sm font-medium">
                        {selectedInvoice.product}
                      </p>
                      <p className="text-xs text-gray-600">
                        Ergonomic office chair with lumbar support
                      </p>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      {selectedInvoice.price.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      {selectedInvoice.quantity}
                    </div>
                    <div className="col-span-2 text-center font-medium text-sm">
                      {(
                        selectedInvoice.price * selectedInvoice.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{(subtotal * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>{(taxAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount (5%):</span>
                <span>{(discountAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-600 text-white px-3 py-1.5 rounded text-sm">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">
                  {(grandTotal * 4).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-center mt-4 pt-3 border-t">
              <p className="text-xs text-gray-600">
                THANK YOU FOR YOUR BUSINESS
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
