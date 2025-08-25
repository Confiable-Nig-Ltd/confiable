"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useInvoice } from "@/contexts/invoice-context";
import Logo from "../general/Logo";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  customerDetails: {
    marginBottom: 20,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E40AF",
    color: "#ffffff",
    padding: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 8,
  },
  col1: { width: "40%" },
  col2: { width: "20%" },
  col3: { width: "20%" },
  col4: { width: "20%" },
  totals: {
    marginLeft: "auto",
    width: "200px",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E40AF",
    color: "#ffffff",
    padding: 8,
    marginTop: 5,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
  },
});

const InvoicePDF = ({ invoice }) => {
  const subtotal = invoice.price * invoice.quantity * 4;
  const taxAmount = (subtotal * 10) / 100;
  const discountAmount = (subtotal * 5) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.invoiceInfo}>
            <Text>Invoice #: 001</Text>
            <Text>30 September, 2025</Text>
          </View>
        </View>

        <View style={styles.customerDetails}>
          <Text style={{ marginBottom: 5 }}>INVOICE TO:</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {invoice.name}
          </Text>
          <Text>Account Officer, Main Warehouse</Text>
          <Text>Lagos Industrial Estate</Text>
          <Text>08122233344</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Product Description</Text>
            <Text style={styles.col2}>Price</Text>
            <Text style={styles.col3}>Quantity</Text>
            <Text style={styles.col4}>Total</Text>
          </View>
          {Array.from({ length: 4 }).map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{invoice.product}</Text>
              <Text style={styles.col2}>{invoice.price.toLocaleString()}</Text>
              <Text style={styles.col3}>{invoice.quantity}</Text>
              <Text style={styles.col4}>
                {(invoice.price * invoice.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>{subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax (10%):</Text>
            <Text>{taxAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount (5%):</Text>
            <Text>{discountAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>Grand Total</Text>
            <Text>{grandTotal.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>THANK YOU FOR YOUR BUSINESS</Text>
        </View>
      </Page>
    </Document>
  );
};

export function InvoiceDetailModal() {
  const { isDetailModalOpen, closeDetailModal, selectedInvoice } = useInvoice();

  if (!selectedInvoice) return null;

  const subtotal = selectedInvoice.price * selectedInvoice.quantity;
  const taxAmount = (subtotal * 10) / 100;
  const discountAmount = (subtotal * 5) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount;

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={closeDetailModal}>
      <DialogContent className="sm:max-w-lg max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 z-10 pb-2">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <PDFDownloadLink
            document={<InvoicePDF invoice={selectedInvoice} />}
            fileName={`invoice-${selectedInvoice.name
              .toLowerCase()
              .replace(/\s+/g, "-")}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                disabled={loading}
              >
                {loading ? "Loading..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-xs text-gray-600">001</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">30,September, 2025</p>
            </div>
          </div>

          <div className="border-t-2 border-blue-600 pt-3">
            <div className="mb-3">
              <p className="text-xs text-blue-600 font-medium">INVOICE TO</p>
              <h2 className="text-base font-bold">{selectedInvoice.name}</h2>
              <p className="text-xs text-gray-600">
                Account Officer, Main Warehouse
              </p>
              <p className="text-xs text-gray-600">Lagos Industrial Estate</p>
              <p className="text-xs text-gray-600">08122233344</p>
            </div>

            <div className="bg-gray-50 rounded p-3">
              <div className="grid grid-cols-12 gap-3 mb-2">
                <div className="col-span-6 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Product Description
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Price
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Quantity
                </div>
                <div className="col-span-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium text-center">
                  Total
                </div>
              </div>

              <div className="max-h-[200px] overflow-y-auto">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="col-span-6">
                      <p className="text-sm font-medium">
                        {selectedInvoice.product}
                      </p>
                      <p className="text-xs text-gray-600">
                        Ergonomic office chair with lumbar support
                      </p>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      {selectedInvoice.price.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      {selectedInvoice.quantity}
                    </div>
                    <div className="col-span-2 text-center font-medium text-sm">
                      {(
                        selectedInvoice.price * selectedInvoice.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{(subtotal * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>{(taxAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount (5%):</span>
                <span>{(discountAmount * 4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-600 text-white px-3 py-1.5 rounded text-sm">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">
                  {(grandTotal * 4).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-center mt-4 pt-3 border-t">
              <p className="text-xs text-gray-600">
                THANK YOU FOR YOUR BUSINESS
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
