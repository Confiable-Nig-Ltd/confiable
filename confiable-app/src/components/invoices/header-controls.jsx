"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, SortAsc, Download, Plus } from "lucide-react";
import { useInvoice } from "@/contexts/invoice-context";

export function HeaderControls() {
  const { setSortBy, setFilterBy, openCreateModal, downloadInvoices } =
    useInvoice();

  return (
    <div className="flex flex-row justify-between items-center gap-4 mb-6">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterBy("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterBy("paid")}>
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterBy("pending")}>
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <SortAsc className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("")}>
              Default
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("price")}>
              Price
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("quantity")}>
              Quantity
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("date")}>
              Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={downloadInvoices}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download Invoice</span>
        </Button>

        <Button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create New Invoice
        </Button>
      </div>
    </div>
  );
}
