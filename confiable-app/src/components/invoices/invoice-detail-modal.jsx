"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useInvoice } from "@/contexts/invoice-context"

export function InvoiceDetailModal() {
  const { isDetailModalOpen, closeDetailModal, selectedInvoice } = useInvoice()

  if (!selectedInvoice) return null

  const subtotal = selectedInvoice.price * selectedInvoice.quantity
  const taxAmount = (subtotal * 10) / 100
  const discountAmount = (subtotal * 5) / 100
  const grandTotal = subtotal + taxAmount - discountAmount

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={closeDetailModal}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold">Confiable</span>
            <span className="text-sm text-gray-500">Nigeria Limited</span>
          </div>
          <Button variant="ghost" size="icon" onClick={closeDetailModal} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">INVOICE</h1>
              <p className="text-sm text-gray-600">001</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">30,September, 2025</p>
            </div>
          </div>

          <div className="border-t-4 border-blue-600 pt-4">
            <div className="mb-4">
              <p className="text-sm text-blue-600 font-medium">INVOICE TO</p>
              <h2 className="text-xl font-bold">{selectedInvoice.name}</h2>
              <p className="text-sm text-gray-600">Account Officer, Main Warehouse</p>
              <p className="text-sm text-gray-600">Lagos Industrial Estate</p>
              <p className="text-sm text-gray-600">08122233344</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium">Product Description</div>
                <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium text-center">Price</div>
                <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium text-center">Quantity</div>
                <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium text-center">Total</div>
              </div>

              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-medium">{selectedInvoice.product}</p>
                    <p className="text-sm text-gray-600">Ergonomic office chair with lumbar support</p>
                  </div>
                  <div className="text-center">{selectedInvoice.price.toLocaleString()}</div>
                  <div className="text-center">{selectedInvoice.quantity}</div>
                  <div className="text-center font-medium">
                    {(selectedInvoice.price * selectedInvoice.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{(subtotal * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>{(taxAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount (5%):</span>
                <span>{(discountAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">{(grandTotal * 4).toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t">
              <p className="italic text-gray-600">THANK YOU FOR YOUR BUSINESS</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
