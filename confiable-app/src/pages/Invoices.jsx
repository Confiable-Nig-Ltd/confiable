import { InvoiceProvider } from "@/contexts/invoice-context";
import { StatisticsCards } from "../components/invoices/statistics-cards";
import { HeaderControls } from "../components/invoices/header-controls";
import { InvoiceTable } from "../components/invoices/invoice-table";
import { Pagination } from "../components/invoices/pagination";
import { InvoiceFormModal } from "../components/invoices/invoice-form-modal";
import { InvoiceDetailModal } from "../components/invoices/invoice-detail-modal";
import { SuccessModal } from "../components/invoices/success-modal";

export default function Invoices() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* stats + controls + table + pagination */}
          <HeaderControls />
          <StatisticsCards />

          <InvoiceTable />
          <Pagination />
        </div>

        {/* modals*/}
        <InvoiceFormModal />
        <InvoiceDetailModal />
        <SuccessModal />
      </div>
    </InvoiceProvider>
  );
}
