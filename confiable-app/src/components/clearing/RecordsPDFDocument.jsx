
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { formatCurrencyDisplay, groupByDate } from "@/utils/currency";

// ✅ Register font
// Font.register({
//   family: "Inter",
//   src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTt0k8eFo95w.ttf",
// });

// ✅ Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
    fontSize: 11,
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyInfo: {
    flexGrow: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  tagline: {
    fontSize: 10,
    color: "#555",
  },
  generatedDate: {
    fontSize: 9,
    color: "#777",
    marginTop: 2,
  },
  recordBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontWeight: "bold" },
  feeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  feeItem: { width: "48%", marginBottom: 4 },
  paymentBlock: { marginTop: 5 },
  paymentDate: { fontSize: 10, color: "#444", marginTop: 3 },
  bullet: { marginLeft: 10, fontSize: 10, color: "#333" },
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#777",
  },
});

// ✅ PDF Document
const RecordsPDFDocument = ({ records = [] }) => {
  const now = new Date().toLocaleString();
  const logoUrl = "/images/company-logo.png"; // Optional

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logoUrl && <Image src={logoUrl} style={styles.logo} />}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Confiable Nig. Ltd</Text>
            <Text style={styles.tagline}>Clearing & Forwarding Services</Text>
            <Text style={styles.generatedDate}>Generated: {now}</Text>
          </View>
        </View>

        {/* Empty State */}
        {records.length === 0 ? (
          <Text>No records available.</Text>
        ) : (
          records.map((record, index) => {
            const grouped = groupByDate(record?.payments || []);

            return (
              <View key={index} style={styles.recordBox}>
                <View style={styles.row}>
                  <Text style={styles.label}>
                    {record.consignee || "—"}
                  </Text>
                  <Text>{formatCurrencyDisplay(record?.total ?? 0)}</Text>
                </View>

                <Text>Item: {record?.item || "—"}</Text>
                <Text>B/L: {record?.billOfLading || "—"}</Text>
                <Text>
                  Balance: {formatCurrencyDisplay(record?.balance ?? 0)}{" "}
                  {record?.balance > 0 ? "(Outstanding)" : "(Cleared)"}
                </Text>

                {/* Fee Breakdown */}
                <View style={styles.feeGrid}>
                  <Text style={styles.feeItem}>
                    Terminal: {formatCurrencyDisplay(record?.terminalFee ?? 0)}
                  </Text>
                  <Text style={styles.feeItem}>
                    Shipping: {formatCurrencyDisplay(record?.shippingFee ?? 0)}
                  </Text>
                  <Text style={styles.feeItem}>
                    Transport: {formatCurrencyDisplay(record?.transport ?? 0)}
                  </Text>
                  <Text style={styles.feeItem}>
                    Agency: {formatCurrencyDisplay(record?.agency ?? 0)}
                  </Text>
                  <Text style={styles.feeItem}>
                    PAAR: {formatCurrencyDisplay(record?.paar ?? 0)}
                  </Text>
                  <Text style={styles.feeItem}>
                    Duty: {formatCurrencyDisplay(record?.duty ?? 0)}
                  </Text>
                </View>

                {/* Payment History */}
                <View style={styles.paymentBlock}>
                  <Text style={styles.label}>Payment History</Text>

                  {Object.keys(grouped).length === 0 ? (
                    <Text style={styles.bullet}>No payments yet.</Text>
                  ) : (
                    Object.entries(grouped).map(([date, payments]) => (
                      <View key={date}>
                        <Text style={styles.paymentDate}>{date}</Text>
                        {payments.map((p, i) => (
                          <Text key={i} style={styles.bullet}>
                            • {formatCurrencyDisplay(p.amount)} — {p.bank}
                          </Text>
                        ))}
                      </View>
                    ))
                  )}
                </View>
              </View>
            );
          })
        )}

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default RecordsPDFDocument;
