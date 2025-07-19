"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInvoice } from "@/contexts/invoice-context"

export function InvoiceTable() {
  const { paginatedInvoices, openDetailModal } = useInvoice()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-gray-600">Name</TableHead>
            <TableHead className="font-medium text-gray-600">Product</TableHead>
            <TableHead className="font-medium text-gray-600">Quantity</TableHead>
            <TableHead className="font-medium text-gray-600">Price</TableHead>
            <TableHead className="font-medium text-gray-600">Tax</TableHead>
            <TableHead className="font-medium text-gray-600">Payment Date</TableHead>
            <TableHead className="font-medium text-gray-600">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.product}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>{invoice.price.toLocaleString()}</TableCell>
              <TableCell>{invoice.tax}</TableCell>
              <TableCell className="text-sm text-gray-600">{invoice.paymentDate}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal(invoice)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
