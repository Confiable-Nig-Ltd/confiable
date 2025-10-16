import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatCurrencyDisplay } from "./currency";

export const groupByDate = (payments = []) =>
  (payments || []).reduce((acc, p) => {
    const d = p.date || "No Date";
    if (!acc[d]) acc[d] = [];
    acc[d].push(p);
    return acc;
  }, {});

export const exportAsPDF = (records) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftMargin = 40;

  if (!records || records.length === 0) {
    doc.setFontSize(12);
    doc.text("Confiable Nig Ltd ", leftMargin, 40);
    doc.setFontSize(10);
    doc.text("No records available.", leftMargin, 70);
    doc.save("confiable_clearing_records_detailed.pdf");
    return;
  }

  records.forEach((r, idx) => {
    if (idx > 0) doc.addPage();

    // Header
    doc.setFontSize(12);
    doc.text("Confiable Nig Ltd —", leftMargin, 40);

    // Consignee details
    doc.setFontSize(10);
    doc.text(`Consignee: ${r.consignee}`, leftMargin, 66);
    doc.text(`Item: ${r.item}`, leftMargin, 84);
    doc.text(`Bill of Lading: ${r.billOfLading || "-"}`, leftMargin, 102);
    doc.text(`Containers: ${r.containers || "-"}`, leftMargin + 280, 84);
    doc.text(`Tonnage: ${r.tonnage || "-"}`, leftMargin + 280, 102);
    doc.text(`Shipper: ${r.shipper || "-"}`, leftMargin, 120);

    // Fee breakdown table
    const feeRows = [
      ["Terminal Fee", formatCurrencyDisplay(r.terminalFee)],
      ["Shipping Fee", formatCurrencyDisplay(r.shippingFee)],
      ["Transport", formatCurrencyDisplay(r.transport)],
      ["Agency", formatCurrencyDisplay(r.agency)],
      ["PAAR", formatCurrencyDisplay(r.paar)],
      ["Duty", formatCurrencyDisplay(r.duty)],
    ];

    doc.autoTable({
      startY: 140,
      head: [["Fee", "Amount"]],
      body: feeRows,
      theme: "grid",
      styles: { cellPadding: 4, fontSize: 10 },
      headStyles: { fillColor: [220, 220, 220] },
      margin: { left: leftMargin, right: 40 },
      columnStyles: {
        0: { cellWidth: 280 },
        1: { halign: "right", cellWidth: 120 },
      },
    });

    let yAfterFees = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 170;

    // Payments table
    const grouped = groupByDate(r.payments || []);
    if (Object.keys(grouped).length === 0) {
      doc.setFontSize(10);
      doc.text("No payments recorded.", leftMargin, yAfterFees);
      yAfterFees += 18;
    } else {
      const paymentsRows = [];
      const dateKeys = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
      dateKeys.forEach((date) => {
        grouped[date].forEach((p) => {
          paymentsRows.push([date, formatCurrencyDisplay(p.amount), p.bank || "N/A"]);
        });
      });

      doc.autoTable({
        startY: yAfterFees,
        head: [["Date", "Amount", "Bank"]],
        body: paymentsRows,
        theme: "grid",
        styles: { cellPadding: 4, fontSize: 10 },
        headStyles: { fillColor: [220, 220, 220] },
        margin: { left: leftMargin, right: 40 },
        columnStyles: {
          0: { cellWidth: 120 },
          1: { cellWidth: 120, halign: "right" },
          2: { cellWidth: 160 },
        },
      });

      yAfterFees = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : yAfterFees + 60;
    }

    // Totals summary
    doc.setFontSize(11);
    doc.text(`Total Fees: ${formatCurrencyDisplay(r.total)}`, leftMargin, yAfterFees);
    doc.text(`Remaining Balance: ${formatCurrencyDisplay(r.balance)}`, leftMargin + 280, yAfterFees);

    // Signature line
    const sigY = yAfterFees + 36;
    doc.setLineWidth(0.5);
    doc.line(leftMargin, sigY, leftMargin + 220, sigY);
    doc.setFontSize(9);
    doc.text("Prepared by: ____________________", leftMargin, sigY + 14);

    // Page footer
    const pageNum = idx + 1;
    const footerText = `Page ${pageNum} of ${records.length}`;
    doc.setFontSize(9);
    doc.text(footerText, pageWidth - leftMargin - doc.getTextWidth(footerText), 806);
  });

  doc.save("confiable_clearing_records_detailed.pdf");
};