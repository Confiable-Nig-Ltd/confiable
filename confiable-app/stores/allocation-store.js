import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAllocationStore = create(
  persist(
    (set, get) => ({
      allocations: [],
      payments: [],
      employees: [
        { id: "1", name: "John Doe", currentStock: 1200 },
        { id: "2", name: "Jane Smith", currentStock: 800 },
        { id: "3", name: "Mike Johnson", currentStock: 950 },
        { id: "4", name: "Sarah Wilson", currentStock: 600 },
      ],

      addAllocation: (allocation) => {
        const newAllocation = {
          ...allocation,
          id: globalThis.crypto.randomUUID(),
          allocationDate: new Date().toISOString(),
          status: "active",
          pricePerBale: allocation.pricePerBale || 0,
          totalAmount:
            (allocation.pricePerBale || 0) * allocation.balesAllocated,
          amountPaid: 0,
          paymentStatus: "pending",
        };

        // Update employee stock
        set((state) => {
          const updatedEmployees = state.employees.map((emp) =>
            emp.id === allocation.employeeId
              ? {
                  ...emp,
                  currentStock: emp.currentStock + allocation.balesAllocated,
                }
              : emp
          );

          return {
            allocations: [...state.allocations, newAllocation],
            employees: updatedEmployees,
          };
        });
      },

      reverseAllocation: (allocationId) => {
        const allocation = get().allocations.find((a) => a.id === allocationId);
        if (!allocation) return;

        set((state) => ({
          allocations: state.allocations.map((a) =>
            a.id === allocationId ? { ...a, status: "reversed" } : a
          ),
          employees: state.employees.map((emp) =>
            emp.id === allocation.employeeId
              ? {
                  ...emp,
                  currentStock: emp.currentStock - allocation.balesAllocated,
                }
              : emp
          ),
        }));
      },

      getEmployeeById: (id) => {
        return get().employees.find((emp) => emp.id === id);
      },

      getActiveAllocations: () => {
        return get().allocations.filter((a) => a.status === "active");
      },

      addPayment: (
        allocationId,
        amount,
        paymentDate = new Date().toISOString()
      ) => {
        // Find the allocation first to calculate bales
        const allocation = get().allocations.find((a) => a.id === allocationId);
        if (!allocation) return;

        // Calculate bales paid for in this payment
        const balesPaidFor = Math.floor(amount / allocation.pricePerBale);

        const payment = {
          id: globalThis.crypto.randomUUID(),
          allocationId,
          amount,
          paymentDate,
          balesPaidFor, // Track bales paid for in this payment
        };

        set((state) => {
          const updatedAllocations = state.allocations.map((alloc) => {
            if (alloc.id === allocationId) {
              const newAmountPaid = (alloc.amountPaid || 0) + amount;
              const totalBalesPaid = Math.floor(
                newAmountPaid / alloc.pricePerBale
              );
              const paymentStatus =
                newAmountPaid >= alloc.totalAmount
                  ? "paid"
                  : newAmountPaid > 0
                  ? "partial"
                  : "pending";

              return {
                ...alloc,
                amountPaid: newAmountPaid,
                balesPaid: totalBalesPaid, // Track total bales paid
                balesRemaining: alloc.balesAllocated - totalBalesPaid, // Track remaining bales
                paymentStatus,
              };
            }
            return alloc;
          });

          return {
            payments: [...state.payments, payment],
            allocations: updatedAllocations,
          };
        });
      },

      getAllocationPayments: (allocationId) => {
        return get().payments.filter(
          (payment) => payment.allocationId === allocationId
        );
      },

      getAllocationWithDetails: (allocationId) => {
        const allocation = get().allocations.find((a) => a.id === allocationId);
        if (!allocation) return null;

        const payments = get().getAllocationPayments(allocationId);
        const employee = get().getEmployeeById(allocation.employeeId);

        return {
          ...allocation,
          employee,
          payments,
          remainingAmount:
            allocation.totalAmount - (allocation.amountPaid || 0),
        };
      },

      getAllTransactions: () => {
        const allocations = get().allocations;
        const payments = get().payments;

        return {
          allocations: allocations.map((allocation) => ({
            ...allocation,
            employee: get().getEmployeeById(allocation.employeeId),
            remainingAmount:
              allocation.totalAmount - (allocation.amountPaid || 0),
          })),
          payments: payments.map((payment) => ({
            ...payment,
            allocation: get().allocations.find(
              (a) => a.id === payment.allocationId
            ),
          })),
        };
      },
    }),
    {
      name: "allocation-storage",
    }
  )
);
