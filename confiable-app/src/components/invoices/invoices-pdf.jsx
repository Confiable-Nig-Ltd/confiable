import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for PDF
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
  date: {
    fontSize: 12,
  },
  tableHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    backgroundColor: "#1E40AF",
    color: "white",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 8,
  },
  colName: { width: "20%" },
  colProduct: { width: "20%" },
  colQuantity: { width: "15%" },
  colPrice: { width: "15%" },
  colTax: { width: "15%" },
  colStatus: { width: "15%" },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "#666",
  },
});

export function InvoicesPDF({ invoices }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICES REPORT</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.colName}>Name</Text>
          <Text style={styles.colProduct}>Product</Text>
          <Text style={styles.colQuantity}>Quantity</Text>
          <Text style={styles.colPrice}>Price</Text>
          <Text style={styles.colTax}>Tax</Text>
          <Text style={styles.colStatus}>Status</Text>
        </View>

        {invoices.map((invoice, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colName}>{invoice.name}</Text>
            <Text style={styles.colProduct}>{invoice.product}</Text>
            <Text style={styles.colQuantity}>{invoice.quantity}</Text>
            <Text style={styles.colPrice}>
              {invoice.price.toLocaleString()}
            </Text>
            <Text style={styles.colTax}>{invoice.tax}</Text>
            <Text style={styles.colStatus}>{invoice.status}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>Generated on {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
