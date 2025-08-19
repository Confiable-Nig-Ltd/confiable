// import React from "react";

// export default function DollarTracker() {
//   return <div>Dollar Tracker (USD ↔ NGN)</div>;
// }

"use client";

import { useState, useMemo } from "react";
import { useContainerStore } from "@/stores/container-store";
import { useDollarTrackerStore } from "@/stores/dollar-tracker-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign, TrendingUp, FileText, Eye, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/date-utils";

export default function DollarTrackerPage() {
  const { containers } = useContainerStore();
  const { payments, addPayment, getPaymentsByInvoice, getInvoiceSummary } =
    useDollarTrackerStore();
  const { toast } = useToast();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    usdAmountPaid: "",
    exchangeRate: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "bank_transfer",
    referenceNumber: "",
    notes: "",
  });

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const invoicesWithPayments = containers.map((container) => {
      const summary = getInvoiceSummary(container.billOfLadingNumber);
      return {
        ...container,
        ...summary,
        totalInvoiceValueUSD: container.totalValue, // Map totalValue to totalInvoiceValueUSD
        outstandingUSD: container.totalValue - summary.totalPaidUSD,
      };
    });

    const totalOutstanding = invoicesWithPayments.reduce(
      (sum, inv) => sum + inv.outstandingUSD,
      0
    );
    const totalNairaSpent = invoicesWithPayments.reduce(
      (sum, inv) => sum + inv.totalNairaSpent,
      0
    );
    const totalPaidUSD = invoicesWithPayments.reduce(
      (sum, inv) => sum + inv.totalPaidUSD,
      0
    );
    const avgExchangeRate =
      totalPaidUSD > 0 ? totalNairaSpent / totalPaidUSD : 0;
    const activeInvoices = invoicesWithPayments.filter(
      (inv) => inv.outstandingUSD > 0
    ).length;

    return {
      totalOutstanding,
      totalNairaSpent,
      avgExchangeRate,
      activeInvoices,
      invoicesWithPayments,
    };
  }, [containers, payments, getInvoiceSummary]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!selectedInvoice) return;

    const usdAmount = Number.parseFloat(paymentForm.usdAmountPaid);
    const rate = Number.parseFloat(paymentForm.exchangeRate);

    if (!usdAmount || !rate || usdAmount <= 0 || rate <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter valid USD amount and exchange rate",
        variant: "destructive",
      });
      return;
    }

    const outstanding =
      selectedInvoice.totalInvoiceValueUSD - selectedInvoice.totalPaidUSD;
    if (usdAmount > outstanding) {
      toast({
        title: "Validation Error",
        description: `Payment amount cannot exceed outstanding balance of ${formatCurrency(
          outstanding
        )}`,
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      billOfLadingNumber: selectedInvoice.billOfLadingNumber,
      containerRecordId: selectedInvoice.id,
      usdAmountPaid: usdAmount,
      exchangeRate: rate,
      paymentDate: paymentForm.paymentDate,
      paymentMethod: paymentForm.paymentMethod,
      referenceNumber: paymentForm.referenceNumber,
      notes: paymentForm.notes,
      createdBy: "current-user",
    };

    addPayment(paymentData);

    toast({
      title: "Success",
      description: `Payment of ${formatCurrency(
        usdAmount
      )} recorded successfully`,
    });

    setIsPaymentModalOpen(false);
    setSelectedInvoice(null);
    setPaymentForm({
      usdAmountPaid: "",
      exchangeRate: "",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "bank_transfer",
      referenceNumber: "",
      notes: "",
    });
  };

  const handlePayClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleViewHistory = (invoice) => {
    setSelectedInvoice(invoice);
    setIsHistoryModalOpen(true);
  };

  const calculateNairaEquivalent = () => {
    const usd = Number.parseFloat(paymentForm.usdAmountPaid) || 0;
    const rate = Number.parseFloat(paymentForm.exchangeRate) || 0;
    return usd * rate;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="h-8 w-8" />
          Dollar Tracker - USD Payment Management
        </h1>
        <p className="text-muted-foreground">
          Track USD payments, exchange rates, and outstanding balances
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total USD Outstanding
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(summaryStats.totalOutstanding)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Naira Spent
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{summaryStats.totalNairaSpent.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Exchange Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{summaryStats.avgExchangeRate.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryStats.activeInvoices}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding USD Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill of Lading</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Total USD</TableHead>
                  <TableHead>Paid USD</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryStats.invoicesWithPayments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No invoices found. Add container records to track
                      payments.
                    </TableCell>
                  </TableRow>
                ) : (
                  summaryStats.invoicesWithPayments.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.billOfLadingNumber}
                      </TableCell>
                      <TableCell>{invoice.supplierName}</TableCell>
                      <TableCell>
                        {formatCurrency(invoice.totalInvoiceValueUSD)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(invoice.totalPaidUSD)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            invoice.outstandingUSD > 0
                              ? "text-destructive font-medium"
                              : "text-green-600"
                          }
                        >
                          {formatCurrency(invoice.outstandingUSD)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {invoice.outstandingUSD === 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            Paid
                          </Badge>
                        ) : invoice.totalPaidUSD > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 border-yellow-200"
                          >
                            Partial
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 border-red-200"
                          >
                            Outstanding
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {invoice.outstandingUSD > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePayClick(invoice)}
                            >
                              Pay
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewHistory(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Entry Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record USD Payment</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Invoice Details */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Invoice:</span>{" "}
                    {selectedInvoice.billOfLadingNumber}
                  </div>
                  <div>
                    <span className="font-medium">Supplier:</span>{" "}
                    {selectedInvoice.supplierName}
                  </div>
                  <div>
                    <span className="font-medium">Total Invoice:</span>{" "}
                    {formatCurrency(selectedInvoice.totalInvoiceValueUSD)}
                  </div>
                  <div>
                    <span className="font-medium">Previously Paid:</span>{" "}
                    {formatCurrency(selectedInvoice.totalPaidUSD)}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Outstanding:</span>{" "}
                    <span className="text-destructive font-bold">
                      {formatCurrency(
                        selectedInvoice.totalInvoiceValueUSD -
                          selectedInvoice.totalPaidUSD
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <h4 className="font-medium border-b pb-2">Payment Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="usdAmount">USD Amount Being Paid *</Label>
                    <Input
                      id="usdAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      max={
                        selectedInvoice.totalInvoiceValueUSD -
                        selectedInvoice.totalPaidUSD
                      }
                      value={paymentForm.usdAmountPaid}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          usdAmountPaid: e.target.value,
                        }))
                      }
                      placeholder="Enter USD amount"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exchangeRate">
                      Exchange Rate (₦ per $1) *
                    </Label>
                    <Input
                      id="exchangeRate"
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentForm.exchangeRate}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          exchangeRate: e.target.value,
                        }))
                      }
                      placeholder="Enter exchange rate"
                      required
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm">
                    <span className="font-medium">
                      Naira Equivalent (Auto-calculated):
                    </span>
                    <div className="text-lg font-bold">
                      ₦{calculateNairaEquivalent().toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Payment Date *</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={paymentForm.paymentDate}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          paymentDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={paymentForm.paymentMethod}
                      onValueChange={(value) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          paymentMethod: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="wire">Wire Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    value={paymentForm.referenceNumber}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        referenceNumber: e.target.value,
                      }))
                    }
                    placeholder="Transaction reference number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={paymentForm.notes}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes about this payment"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Attach Receipt (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Record Payment</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment History Modal */}
      <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Payment History: {selectedInvoice?.billOfLadingNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Payment Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Total Invoice</div>
                    <div>
                      {formatCurrency(selectedInvoice.totalInvoiceValueUSD)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Total Paid</div>
                    <div>{formatCurrency(selectedInvoice.totalPaidUSD)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Outstanding</div>
                    <div className="text-destructive font-bold">
                      {formatCurrency(
                        selectedInvoice.totalInvoiceValueUSD -
                          selectedInvoice.totalPaidUSD
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Avg Rate</div>
                    <div>
                      ₦
                      {selectedInvoice.averageExchangeRate?.toFixed(2) ||
                        "0.00"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History Table */}
              <div>
                <h4 className="font-medium mb-3">Payment History</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>USD Paid</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Naira Paid</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getPaymentsByInvoice(
                      selectedInvoice.billOfLadingNumber
                    ).map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(payment.usdAmountPaid)}
                        </TableCell>
                        <TableCell>₦{payment.exchangeRate}</TableCell>
                        <TableCell>
                          ₦{payment.nairaEquivalent.toLocaleString()}
                        </TableCell>
                        <TableCell className="capitalize">
                          {payment.paymentMethod.replace("_", " ")}
                        </TableCell>
                        <TableCell>{payment.referenceNumber || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
