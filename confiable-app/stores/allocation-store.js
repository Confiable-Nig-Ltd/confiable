import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAllocationStore = create(
  persist(
    (set, get) => ({
      allocations: [],
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
    }),
    {
      name: "allocation-storage",
    }
  )
);
