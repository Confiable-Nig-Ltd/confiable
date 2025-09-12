"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import useBankingStore from "@/src/stores/banking/banking-store";
import { AddCustomerDialog } from "./AddCustomerDialog";

// Format amount with commas
const formatAmount = (amount) => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Inactive":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { customers } = useBankingStore();
  const itemsPerPage = 6;

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = customers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
          className={
            currentPage === 1 ? "bg-blue-600 text-white hover:bg-blue-700" : ""
          }
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            className={
              currentPage === i
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Customer
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-gray-700 py-4">
                Name
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Contact Person
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Email
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Phone
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Billing Address
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Shipping Address
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Credit Limit
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((customer) => (
              <TableRow key={customer.id} className="border-b last:border-b-0">
                <TableCell className="py-4 font-medium text-gray-900">
                  {customer.name}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {customer.contact_person}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {customer.email}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {customer.phone}
                </TableCell>
                <TableCell className="py-4 text-gray-700 max-w-[200px] truncate">
                  {customer.billing_address}
                </TableCell>
                <TableCell className="py-4 text-gray-700 max-w-[200px] truncate">
                  {customer.shipping_address}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  ${formatAmount(customer.credit_limit)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className={`${getStatusVariant(
                      customer.status
                    )} border-0 font-medium px-3 py-1`}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <AddCustomerDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Card>
  );
}
