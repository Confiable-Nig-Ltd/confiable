import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useDollarTrackerStore = create(
  persist(
    (set, get) => ({
      payments: [],
      invoices: [],

      addPayment: (payment) => {
        const newPayment = {
          ...payment,
          id: globalThis.crypto.randomUUID(),
          nairaEquivalent: payment.usdAmountPaid * payment.exchangeRate,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          payments: [...state.payments, newPayment],
        }))
      },

      getPaymentsByInvoice: (billOfLadingNumber) => {
        return get().payments.filter((p) => p.billOfLadingNumber === billOfLadingNumber)
      },

      getInvoiceSummary: (billOfLadingNumber) => {
        const payments = get().getPaymentsByInvoice(billOfLadingNumber)
        const totalPaid = payments.reduce((sum, p) => sum + p.usdAmountPaid, 0)
        const totalNaira = payments.reduce((sum, p) => sum + p.nairaEquivalent, 0)
        const avgRate = totalPaid > 0 ? totalNaira / totalPaid : 0

        return {
          totalPaidUSD: totalPaid,
          totalNairaSpent: totalNaira,
          averageExchangeRate: avgRate,
          paymentCount: payments.length,
          lastPaymentDate: payments.length > 0 ? payments[payments.length - 1].paymentDate : null,
        }
      },

      getOutstandingInvoices: () => {
        // This would typically come from container records
        return []
      },
    }),
    {
      name: "dollar-tracker-storage",
    },
  ),
)
