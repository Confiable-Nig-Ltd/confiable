import { create } from "zustand";
import { PurchaseOrder as initialPurchaseOrders } from "@/src/data/purchaseOrderData";

const useBankingStore = create((set) => ({
  purchaseOrders: initialPurchaseOrders,
  isAddingPurchaseOrder: false,

  addPurchaseOrder: async (orderData) => {
    try {
      set({ isAddingPurchaseOrder: true });

      // Create a new purchase order with the next available ID
      const newPurchaseOrder = {
        ...orderData,
        po_id: Math.max(...initialPurchaseOrders.map((po) => po.po_id)) + 1,
        total_amount: parseFloat(orderData.total_amount),
        supplier_id: parseInt(orderData.supplier_id),
        created_by: parseInt(orderData.created_by),
      };

      // Update the store with the new purchase order
      set((state) => ({
        purchaseOrders: [...state.purchaseOrders, newPurchaseOrder],
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isAddingPurchaseOrder: false });
    }
  },
}));

export default useBankingStore;
