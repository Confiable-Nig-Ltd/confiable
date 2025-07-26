"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useInvoice } from "@/contexts/invoice-context"

export function SuccessModal() {
  const { isSuccessModalOpen, closeSuccessModal } = useInvoice()

  return (
    <Dialog open={isSuccessModalOpen} onOpenChange={closeSuccessModal}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={closeSuccessModal} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 pb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold">New Invoice Created</h2>

          <p className="text-gray-600 text-sm">
            A new invoice has been created. You can now view invoice, and download invoice.
          </p>

          <Button onClick={closeSuccessModal} className="w-full bg-blue-600 hover:bg-blue-700">
            Go to Invoice list
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
