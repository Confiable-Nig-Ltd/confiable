import { format } from "date-fns";
import { useAllocationStore } from "@/stores/allocation-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, Calendar, DollarSign } from "lucide-react";

export function AllocationDetailsDialog({ allocation, isOpen, onClose }) {
  const { getAllocationWithDetails } = useAllocationStore();
  const details = allocation ? getAllocationWithDetails(allocation.id) : null;

  if (!details) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Allocation Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-3xl font-bold">
                  ₦{details.totalAmount?.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Amount Paid
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-3xl font-bold text-green-600">
                  ₦{details.amountPaid?.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  Remaining Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-3xl font-bold text-red-600">
                  ₦{details.remainingAmount?.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Allocation Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  Allocation Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-1" />
                    <div>
                      <div className="font-medium">Date & Time</div>
                      <div className="text-muted-foreground">
                        {format(new Date(details.allocationDate), "PPpp")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 mt-1" />
                    <div>
                      <div className="font-medium">Container Details</div>
                      <div className="text-muted-foreground">
                        Bill of Lading: {details.billOfLadingNumber}
                        <br />
                        Bales Allocated:{" "}
                        {details.balesAllocated?.toLocaleString()}
                        <br />
                        Bales Paid For: {details.balesPaid?.toLocaleString()}
                        <br />
                        Bales Remaining:{" "}
                        {details.balesRemaining?.toLocaleString()}
                        <br />
                        Price per Bale: ₦
                        {details.pricePerBale?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 mt-1" />
                    <div>
                      <div className="font-medium">Employee Details</div>
                      <div className="text-muted-foreground">
                        Name: {details.employeeName}
                        <br />
                        Current Stock:{" "}
                        {details.employee?.currentStock?.toLocaleString()} bales
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-1" />
                    <div>
                      <div className="font-medium">Payment Status</div>
                      <Badge
                        variant="outline"
                        className={
                          details.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : details.paymentStatus === "partial"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {details.paymentStatus?.charAt(0).toUpperCase() +
                          details.paymentStatus?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Bales Paid For</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.payments?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-center py-4 text-muted-foreground"
                          >
                            No payments recorded yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        details.payments?.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              {format(
                                new Date(payment.paymentDate),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </TableCell>
                            <TableCell>
                              ₦{payment.amount?.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {payment.balesPaidFor?.toLocaleString()} bales
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes Section */}
          {details.notes && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {details.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
