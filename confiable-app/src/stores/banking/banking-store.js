import { create } from "zustand";
import { PurchaseOrder as initialPurchaseOrders } from "@/src/data/purchaseOrderData";
import { StockTransaction as initialStockTransactions } from "@/src/data/stockTransactionData";
import { salesOrder as initialSalesOrders } from "@/src/data/salesOrderData";

const useBankingStore = create((set) => ({
  purchaseOrders: initialPurchaseOrders,
  stockTransactions: initialStockTransactions,
  salesOrders: initialSalesOrders,
  isAddingPurchaseOrder: false,
  isAddingStockTransaction: false,
  isAddingSalesOrder: false,

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

  addStockTransaction: async (transactionData) => {
    try {
      set({ isAddingStockTransaction: true });

      // Create a new stock transaction with the next available ID
      const newTransaction = {
        ...transactionData,
        transaction_id:
          Math.max(...initialStockTransactions.map((st) => st.transaction_id)) +
          1,
        quantity: parseInt(transactionData.quantity),
        performed_by: parseInt(transactionData.performed_by),
      };

      // Update the store with the new stock transaction
      set((state) => ({
        stockTransactions: [...state.stockTransactions, newTransaction],
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isAddingStockTransaction: false });
    }
  },

  addSalesOrder: async (orderData) => {
    try {
      set({ isAddingSalesOrder: true });

      // Create a new sales order with the next available ID
      const newSalesOrder = {
        ...orderData,
        so_id: Math.max(...initialSalesOrders.map((so) => so.so_id)) + 1,
        total_amount: parseFloat(orderData.total_amount),
        customer_id: parseInt(orderData.customer_id),
        created_by: parseInt(orderData.created_by),
      };

      // Update the store with the new sales order
      set((state) => ({
        salesOrders: [...state.salesOrders, newSalesOrder],
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isAddingSalesOrder: false });
    }
  },
}));

export default useBankingStore;
