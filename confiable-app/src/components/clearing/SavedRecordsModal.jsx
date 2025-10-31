import React, { useMemo, useState } from "react";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { RecordsPDF } from "./records-pdf";
import { formatCurrencyDisplay, groupByDate } from "@/utils/currency";

// ✅ Inline error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("PDF render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 text-sm mt-2">
          ⚠️ Error generating PDF. Please check your data.
        </div>
      );
    }
    return this.props.children;
  }
}

const SavedRecordsModal = ({
  isOpen,
  onClose,
  records,
  consignees,
  searchTerm,
  filterConsignee,
  onSearchChange,
  onFilterChange,
  onEditRecord,
  onDeleteRecord,
  onOpenUpdateModal,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.consignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.billOfLading?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesConsignee =
        !filterConsignee || record.consignee === filterConsignee;

      return matchesSearch && matchesConsignee;
    });
  }, [records, searchTerm, filterConsignee]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-md p-6 overflow-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Confiable Nig Ltd</h3>

          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border p-2 rounded-md"
            />
            <select
              value={filterConsignee}
              onChange={(e) => onFilterChange(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">All Consignees</option>
              {consignees.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>

        {/* Records */}
        {filteredRecords.length === 0 ? (
          <p className="text-center text-gray-600">
            {records.length === 0
              ? "No records found."
              : "No records match your search."}
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {filteredRecords.map((record) => {
                const grouped = groupByDate(record.payments || []);
                return (
                  <div
                    key={record.id}
                    className="border rounded-md p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{record.consignee}</h4>
                        <p className="text-sm text-gray-600">
                          Item: {record.item}
                        </p>
                        <p className="text-sm text-gray-600">
                          B/L: {record.billOfLading || "-"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created:{" "}
                          {new Date(record.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrencyDisplay(record.total)}
                        </p>
                        <p
                          className={
                            record.balance > 0
                              ? "text-red-600"
                              : "text-green-700"
                          }
                        >
                          {formatCurrencyDisplay(record.balance)}
                        </p>
                      </div>
                    </div>

                    {/* Fee Breakdown */}
                    <div className="mt-3 text-sm text-gray-700 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div>
                        Terminal: {formatCurrencyDisplay(record.terminalFee)}
                      </div>
                      <div>
                        Shipping: {formatCurrencyDisplay(record.shippingFee)}
                      </div>
                      <div>
                        Transport: {formatCurrencyDisplay(record.transport)}
                      </div>
                      <div>Agency: {formatCurrencyDisplay(record.agency)}</div>
                      <div>PAAR: {formatCurrencyDisplay(record.paar)}</div>
                      <div>Duty: {formatCurrencyDisplay(record.duty)}</div>
                    </div>

                    {/* Payments */}
                    <div className="mt-3">
                      <h5 className="font-semibold">Payment History</h5>
                      {Object.keys(grouped).length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No payments yet.
                        </p>
                      ) : (
                        Object.entries(grouped).map(([date, payments]) => (
                          <div key={date} className="mt-2">
                            <p className="font-semibold text-gray-700">
                              {date}
                            </p>
                            <ul className="ml-4 list-disc text-sm text-gray-600">
                              {payments.map((p) => (
                                <li key={p.id}>
                                  {formatCurrencyDisplay(p.amount)} — {p.bank}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {record.balance > 0 && (
                        <button
                          onClick={() => onOpenUpdateModal(record)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                        >
                          Update Payment
                        </button>
                      )}
                      <button
                        onClick={() => onEditRecord(record.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download & Print */}
            <div className="mt-6 flex gap-3 justify-end flex-wrap">
              {/* Download PDF */}
              <ErrorBoundary>
                <PDFDownloadLink
                  document={<RecordsPDF records={filteredRecords} />}
                  fileName={`clearing-records-${
                    new Date().toISOString().split("T")[0]
                  }.pdf`}
                >
                  {({ loading }) => (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 disabled:opacity-50">
                      {loading ? "Preparing Download..." : "Download Records"}
                    </button>
                  )}
                </PDFDownloadLink>
              </ErrorBoundary>

              {/* Print PDF */}
              <ErrorBoundary>
                <BlobProvider
                  document={<RecordsPDF records={filteredRecords} />}
                >
                  {({ url, loading, error }) =>
                    loading ? (
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm opacity-50 cursor-not-allowed">
                        Preparing...
                      </button>
                    ) : error ? (
                      <div className="text-red-600 text-sm">
                        ⚠️ Error preparing print.
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (url) {
                            setIsPrinting(true);
                            const win = window.open(url);
                            if (win) {
                              win.addEventListener("load", () => {
                                win.print();
                                setIsPrinting(false);
                              });
                            } else {
                              alert("Please allow pop-ups to enable printing.");
                              setIsPrinting(false);
                            }
                          }
                        }}
                        disabled={isPrinting}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 ${
                          isPrinting && "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {isPrinting ? "Printing..." : "Print"}
                      </button>
                    )
                  }
                </BlobProvider>
              </ErrorBoundary>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedRecordsModal;
