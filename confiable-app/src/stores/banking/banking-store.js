import { create } from "zustand";
import { PurchaseOrder as initialPurchaseOrders } from "@/src/data/purchaseOrderData";
import { StockTransaction as initialStockTransactions } from "@/src/data/stockTransactionData";
import { salesOrder as initialSalesOrders } from "@/src/data/salesOrderData";
import { Accounts as initialAccounts } from "@/src/data/accountData";
import { Customers as initialCustomers } from "@/src/data/customerData";

const useBankingStore = create((set) => ({
  purchaseOrders: initialPurchaseOrders,
  stockTransactions: initialStockTransactions,
  salesOrders: initialSalesOrders,
  accounts: initialAccounts,
  customers: initialCustomers,
  isAddingPurchaseOrder: false,
  isAddingStockTransaction: false,
  isAddingSalesOrder: false,
  isAddingAccount: false,
  isAddingCustomer: false,

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

  addAccount: async (accountData) => {
    try {
      set({ isAddingAccount: true });

      // Create a new account with the next available ID and account code
      const nextId =
        Math.max(...initialAccounts.map((acc) => acc.account_id)) + 1;
      const accountCode = `A-${String(nextId).padStart(4, "0")}`;

      const newAccount = {
        ...accountData,
        account_id: nextId,
        account_code: accountCode,
        parent_account_id:
          accountData.parent_account_id && accountData.parent_account_id !== "0"
            ? parseInt(accountData.parent_account_id)
            : null,
        is_active: accountData.status === "Active",
      };

      // Update the store with the new account
      set((state) => ({
        accounts: [...state.accounts, newAccount],
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isAddingAccount: false });
    }
  },

  addCustomer: async (customerData) => {
    try {
      set({ isAddingCustomer: true });

      // Create a new customer with the next available ID
      const newCustomer = {
        ...customerData,
        customer_id:
          Math.max(...initialCustomers.map((cust) => cust.customer_id)) + 1,
        credit_limit: parseFloat(customerData.credit_limit),
      };

      // Update the store with the new customer
      set((state) => ({
        customers: [...state.customers, newCustomer],
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isAddingCustomer: false });
    }
  },
}));

export default useBankingStore;
