import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useDistributionStore = create(
  persist(
    (set, get) => ({
      distributions: [],

      addDistribution: (distribution) => {
        const newDistribution = {
          ...distribution,
          id: globalThis.crypto.randomUUID(),
          distributionDate: new Date().toISOString(),
          totalDistributed: distribution.distributions.reduce((sum, d) => sum + d.balesReceived, 0),
        }

        set((state) => ({
          distributions: [...state.distributions, newDistribution],
        }))
      },

      getDistributionHistory: () => {
        return get().distributions.sort((a, b) => new Date(b.distributionDate) - new Date(a.distributionDate))
      },
    }),
    {
      name: "distribution-storage",
    },
  ),
)
