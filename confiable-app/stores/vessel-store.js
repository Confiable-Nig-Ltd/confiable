import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useVesselStore = create(
  persist(
    (set, get) => ({
      vessels: [],

      addVessel: (vessel) => {
        const newVessel = {
          ...vessel,
          id: globalThis.crypto.randomUUID(),
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          vessels: [...state.vessels, newVessel],
        }))
      },

      updateVessel: (id, updates) => {
        set((state) => ({
          vessels: state.vessels.map((vessel) =>
            vessel.id === id ? { ...vessel, ...updates, updatedAt: new Date().toISOString() } : vessel,
          ),
        }))
      },

      deleteVessel: (id) => {
        set((state) => ({
          vessels: state.vessels.filter((vessel) => vessel.id !== id),
        }))
      },

      getVesselById: (id) => {
        return get().vessels.find((vessel) => vessel.id === id)
      },
    }),
    {
      name: "vessel-storage",
    },
  ),
)
