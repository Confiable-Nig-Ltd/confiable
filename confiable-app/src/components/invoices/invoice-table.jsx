"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoice } from "@/contexts/invoice-context";

export function InvoiceTable() {
  const { paginatedInvoices, openDetailModal } = useInvoice();

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="[&_tr]:border-0">
          <TableRow className="bg-gray-50">
            <TableHead className="py-4 font-medium text-gray-600">
              Name
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Product
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Quantity
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Price
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Tax
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Payment Date
            </TableHead>
            <TableHead className="py-4 font-medium text-gray-600">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-0">
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-blue-50">
              <TableCell className="py-4 hover:bg-blue-50">
                {invoice.name}
              </TableCell>
              <TableCell className="py-4 hover:bg-blue-50">
                {invoice.product}
              </TableCell>
              <TableCell className="py-4 hover:bg-blue-50">
                {invoice.quantity}
              </TableCell>
              <TableCell className="py-4 hover:bg-blue-50">
                {invoice.price.toLocaleString()}
              </TableCell>
              <TableCell className="py-4 hover:bg-blue-50">
                {invoice.tax}
              </TableCell>
              <TableCell className="py-4 text-sm text-gray-600 hover:bg-blue-50">
                {invoice.paymentDate}
              </TableCell>
              <TableCell className="py-4 hover:bg-blue-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDetailModal(invoice)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:underline px-4"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
