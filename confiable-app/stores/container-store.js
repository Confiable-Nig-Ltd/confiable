import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useContainerStore = create(
  persist(
    (set, get) => ({
      containers: [
        {
          id: "sample-1",
          billOfLadingNumber: "BL-2024-001",
          supplierName: "ABC Textiles",
          supplierId: "1",
          shippingDate: "2024-01-15",
          arrivalDate: "2024-02-15",
          status: "arrived",
          totalContainers: 2,
          totalBales: 450,
          totalValue: 25000,
          notes: "High quality cotton bales - Available for distribution",
          containers: [
            { containerNumber: "CONT-001", balesCount: 200, weight: 5000 },
            { containerNumber: "CONT-002", balesCount: 250, weight: 6000 },
          ],
          createdAt: "2024-01-10T10:00:00.000Z",
          updatedAt: "2024-02-15T14:30:00.000Z",
        },
        {
          id: "sample-2",
          billOfLadingNumber: "BL-2024-002",
          supplierName: "XYZ Imports",
          supplierId: "2",
          shippingDate: "2024-01-20",
          arrivalDate: "2024-02-20",
          status: "allocated",
          totalContainers: 1,
          totalBales: 300,
          totalValue: 18000,
          notes: "Premium grade materials - Partially allocated",
          containers: [{ containerNumber: "CONT-003", balesCount: 300, weight: 7500 }],
          createdAt: "2024-01-15T09:00:00.000Z",
          updatedAt: "2024-02-20T16:45:00.000Z",
        },
        {
          id: "sample-3",
          billOfLadingNumber: "BL-2024-003",
          supplierName: "DEF Supplies",
          supplierId: "3",
          shippingDate: "2024-02-01",
          arrivalDate: "2024-03-01",
          status: "arrived",
          totalContainers: 3,
          totalBales: 600,
          totalValue: 35000,
          notes: "Mixed grade cotton shipment - Ready for distribution",
          containers: [
            { containerNumber: "CONT-004", balesCount: 180, weight: 4500 },
            { containerNumber: "CONT-005", balesCount: 220, weight: 5500 },
            { containerNumber: "CONT-006", balesCount: 200, weight: 5000 },
          ],
          createdAt: "2024-01-25T11:30:00.000Z",
          updatedAt: "2024-02-01T08:15:00.000Z",
        },
        {
          id: "sample-4",
          billOfLadingNumber: "BL-2024-004",
          supplierName: "GHI Trading",
          supplierId: "4",
          shippingDate: "2024-02-10",
          arrivalDate: "2024-03-10",
          status: "allocated",
          totalContainers: 2,
          totalBales: 400,
          totalValue: 22000,
          notes: "Standard grade materials - Available for distribution",
          containers: [
            { containerNumber: "CONT-007", balesCount: 200, weight: 5000 },
            { containerNumber: "CONT-008", balesCount: 200, weight: 5000 },
          ],
          createdAt: "2024-02-05T14:20:00.000Z",
          updatedAt: "2024-03-10T10:15:00.000Z",
        },
      ],
      suppliers: [
        { id: "1", name: "ABC Textiles" },
        { id: "2", name: "XYZ Imports" },
        { id: "3", name: "DEF Supplies" },
        { id: "4", name: "GHI Trading" },
      ],

      addContainer: (container) => {
        const newContainer = {
          ...container,
          id: globalThis.crypto.randomUUID(),
          status: "pending",
          totalContainers: container.containers.length,
          totalBales: container.containers.reduce((sum, c) => sum + c.balesCount, 0),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          containers: [...state.containers, newContainer],
        }))
      },

      updateContainer: (id, updates) => {
        set((state) => ({
          containers: state.containers.map((container) =>
            container.id === id ? { ...container, ...updates, updatedAt: new Date().toISOString() } : container,
          ),
        }))
      },

      deleteContainer: (id) => {
        set((state) => ({
          containers: state.containers.filter((container) => container.id !== id),
        }))
      },

      getContainerById: (id) => {
        return get().containers.find((container) => container.id === id)
      },

      getAvailableContainers: () => {
        return get().containers.filter(
          (container) => container.status === "arrived" || container.status === "allocated",
        )
      },

      getDistributionContainers: () => {
        return get().containers.filter(
          (container) => container.status === "arrived" || container.status === "allocated",
        )
      },
    }),
    {
      name: "container-storage",
      partialize: (state) => ({ containers: state.containers, suppliers: state.suppliers }),
    },
  ),
)
