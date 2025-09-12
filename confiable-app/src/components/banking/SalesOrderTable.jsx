"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
import useBankingStore from "@/src/stores/banking/banking-store";
import { AddSalesOrderDialog } from "./AddSalesOrderDialog";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Format date to DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Format amount with commas
const formatAmount = (amount) => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getStatusVariant = (status) => {
  switch (status) {
    case "Pending":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getPaymentStatusVariant = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Unpaid":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Partial":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "Overdue":
      return "bg-rose-100 text-rose-800 hover:bg-rose-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function SalesOrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 6;

  const { salesOrders } = useBankingStore();

  const totalPages = Math.ceil(salesOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = salesOrders.slice(startIndex, endIndex);

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

    // Always show last page if there's more than one page
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
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Sales Order</CardTitle>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sales Order
        </Button>
      </CardHeader>
      <AddSalesOrderDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="font-medium text-gray-700 py-4">
                Customer
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Order Date
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Delivery Date
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Status
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Total Amount
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Payment Status
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Created By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((order) => (
              <TableRow key={order.so_id} className="border-b last:border-b-0">
                <TableCell className="py-4 font-medium text-gray-900">
                  Customer {order.customer_id}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {formatDate(order.order_date)}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {formatDate(order.delivery_date)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className={`${getStatusVariant(
                      order.status
                    )} border-0 font-medium px-3 py-1`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  ${formatAmount(order.total_amount)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className={`${getPaymentStatusVariant(
                      order.payment_status
                    )} border-0 font-medium px-3 py-1`}
                  >
                    {order.payment_status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  User {order.created_by}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
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
      </CardContent>
    </Card>
  );
}
