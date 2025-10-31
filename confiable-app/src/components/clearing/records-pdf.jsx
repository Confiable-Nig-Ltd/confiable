import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#F9FAFB",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
    color: "#1F2937",
  },
  date: {
    fontSize: 14,
    textAlign: "right",
    marginBottom: 20,
  },
  recordCard: {
    backgroundColor: "white",
    marginBottom: 20,
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
  },
  consigneeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
  },
  detailsSection: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    width: "25%",
    color: "#6B7280",
  },
  detailValue: {
    flex: 1,
    color: "#1F2937",
  },
  costsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  costItem: {
    width: "33%",
    marginBottom: 8,
  },
  costLabel: {
    color: "#6B7280",
    fontSize: 11,
  },
  costValue: {
    color: "#1F2937",
    fontSize: 12,
    fontWeight: "bold",
  },
  paymentSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  noPayments: {
    color: "#6B7280",
    fontStyle: "italic",
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#666666",
    textAlign: "left",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
});

export function RecordsPDF({ records }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>CLEARING RECORDS REPORT</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>

        {records.map((record, index) => (
          <View key={index} style={styles.recordCard}>
            {/* Record Header with Consignee and Total */}
            <View style={styles.recordHeader}>
              <Text style={styles.consigneeName}>{record.consignee}</Text>
              <Text style={styles.totalAmount}>
                ₦{record.amount?.toLocaleString() || "0"}
              </Text>
            </View>

            {/* Basic Details */}
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Item:</Text>
                <Text style={styles.detailValue}>{record.item || "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>B/L:</Text>
                <Text style={styles.detailValue}>{record.bl || "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Created:</Text>
                <Text style={styles.detailValue}>
                  {record.date
                    ? new Date(record.date).toLocaleDateString()
                    : "Invalid Date"}
                </Text>
              </View>
            </View>

            {/* Costs Grid */}
            <View style={styles.costsGrid}>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Terminal:</Text>
                <Text style={styles.costValue}>
                  ₦{record.terminal?.toLocaleString() || "0"}
                </Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Shipping:</Text>
                <Text style={styles.costValue}>
                  ₦{record.shipping?.toLocaleString() || "0"}
                </Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Transport:</Text>
                <Text style={styles.costValue}>
                  ₦{record.transport?.toLocaleString() || "0"}
                </Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Agency:</Text>
                <Text style={styles.costValue}>
                  ₦{record.agency?.toLocaleString() || "0"}
                </Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>PAAR:</Text>
                <Text style={styles.costValue}>
                  ₦{record.paar?.toLocaleString() || "0"}
                </Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Duty:</Text>
                <Text style={styles.costValue}>
                  ₦{record.duty?.toLocaleString() || "0"}
                </Text>
              </View>
            </View>

            {/* Payment History */}
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>Payment History</Text>
              {record.payments && record.payments.length > 0 ? (
                record.payments.map((payment, pIndex) => (
                  <View key={pIndex} style={styles.paymentRow}>
                    <Text>{new Date(payment.date).toLocaleDateString()}</Text>
                    <Text>₦{payment.amount.toLocaleString()}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noPayments}>No payments yet.</Text>
              )}
            </View>
          </View>
        ))}

        <Text style={styles.footerText}>
          Generated on {new Date().toLocaleTimeString()}
        </Text>
      </Page>
    </Document>
  );
}
