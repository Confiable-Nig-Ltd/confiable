"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
import useBankingStore from "@/src/stores/banking/banking-store";
import { AddAccountDialog } from "./AddAccountDialog";
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
import { Accounts } from "@/src/data/accountData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getStatusVariant = (isActive) => {
  if (isActive) {
    return "bg-green-100 text-green-800 hover:bg-green-100";
  }
  return "bg-red-100 text-red-800 hover:bg-red-100";
};

const getAccountTypeVariant = (type) => {
  switch (type) {
    case "Asset":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Liability":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "Equity":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "Revenue":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Expense":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function AccountTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 6;

  const { accounts } = useBankingStore();

  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = accounts.slice(startIndex, endIndex);

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
        <CardTitle className="text-2xl font-bold">Account</CardTitle>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </CardHeader>
      <AddAccountDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="font-medium text-gray-700 py-4">
                Account Code
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Account Name
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Account Type
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Parent Account
              </TableHead>
              <TableHead className="font-medium text-gray-700 py-4">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((account) => (
              <TableRow
                key={account.account_id}
                className="border-b last:border-b-0"
              >
                <TableCell className="py-4 font-medium text-gray-900">
                  {account.account_code}
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {account.account_name}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className={`${getAccountTypeVariant(
                      account.account_type
                    )} border-0 font-medium px-3 py-1`}
                  >
                    {account.account_type}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-gray-700">
                  {account.parent_account_id
                    ? `Account ${account.parent_account_id}`
                    : "None"}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className={`${getStatusVariant(
                      account.is_active
                    )} border-0 font-medium px-3 py-1`}
                  >
                    {account.is_active ? "Active" : "Inactive"}
                  </Badge>
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
