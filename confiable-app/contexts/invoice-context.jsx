"use client";

import { createContext, useContext, useReducer, useMemo } from "react";

const InvoiceContext = createContext();

// Initial state
const initialState = {
  invoices: [
    {
      id: 1,
      name: "Mbioke Nkanta",
      product: "Office Chair",
      quantity: 300,
      price: 5000,
      tax: 250,
      paymentDate: "May 20, 2025, 10:48:00 AM",
      status: "paid",
    },
    {
      id: 2,
      name: "Babajola James",
      product: "Office Table",
      quantity: 300,
      price: 5000,
      tax: 145,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 3,
      name: "Jane Ransom",
      product: "Laptop",
      quantity: 150,
      price: 20000,
      tax: 500,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 4,
      name: "Samson Delilah",
      product: "Pack of paper",
      quantity: 1000,
      price: 300,
      tax: 50,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 5,
      name: "Kane Harry",
      product: "Box of wallpaper",
      quantity: 50,
      price: 100,
      tax: 30,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 6,
      name: "Peter Parker",
      product: "Display Screen",
      quantity: 10,
      price: 10000,
      tax: 250,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 7,
      name: "Trevor George",
      product: "Air Conditioner",
      quantity: 20,
      price: 7000,
      tax: 500,
      paymentDate: "Scheduled for May 31, 2025",
      status: "pending",
    },
    {
      id: 8,
      name: "Sarah Connor",
      product: "Desktop Computer",
      quantity: 25,
      price: 15000,
      tax: 750,
      paymentDate: "Scheduled for June 15, 2025",
      status: "pending",
    },
    {
      id: 9,
      name: "John Smith",
      product: "Printer",
      quantity: 40,
      price: 2500,
      tax: 125,
      paymentDate: "May 25, 2025, 09:30:00 AM",
      status: "paid",
    },
    {
      id: 10,
      name: "Mary Johnson",
      product: "Monitor",
      quantity: 60,
      price: 8000,
      tax: 400,
      paymentDate: "Scheduled for June 10, 2025",
      status: "pending",
    },
    {
      id: 11,
      name: "David Wilson",
      product: "Keyboard",
      quantity: 200,
      price: 500,
      tax: 25,
      paymentDate: "May 22, 2025, 14:15:00 PM",
      status: "paid",
    },
    {
      id: 12,
      name: "Lisa Brown",
      product: "Mouse",
      quantity: 150,
      price: 300,
      tax: 15,
      paymentDate: "Scheduled for June 20, 2025",
      status: "pending",
    },
    {
      id: 13,
      name: "Michael Davis",
      product: "Webcam",
      quantity: 30,
      price: 4000,
      tax: 200,
      paymentDate: "Scheduled for June 25, 2025",
      status: "pending",
    },
    {
      id: 14,
      name: "Jennifer Garcia",
      product: "Headphones",
      quantity: 80,
      price: 1500,
      tax: 75,
      paymentDate: "May 28, 2025, 11:45:00 AM",
      status: "paid",
    },
    {
      id: 15,
      name: "Robert Martinez",
      product: "Speakers",
      quantity: 45,
      price: 3500,
      tax: 175,
      paymentDate: "Scheduled for July 05, 2025",
      status: "pending",
    },
    {
      id: 16,
      name: "Amanda Rodriguez",
      product: "USB Drive",
      quantity: 500,
      price: 200,
      tax: 10,
      paymentDate: "Scheduled for July 10, 2025",
      status: "pending",
    },
    {
      id: 17,
      name: "Christopher Lee",
      product: "External Hard Drive",
      quantity: 20,
      price: 12000,
      tax: 600,
      paymentDate: "May 30, 2025, 16:20:00 PM",
      status: "paid",
    },
    {
      id: 18,
      name: "Michelle White",
      product: "Router",
      quantity: 15,
      price: 6000,
      tax: 300,
      paymentDate: "Scheduled for July 15, 2025",
      status: "pending",
    },
    {
      id: 19,
      name: "Daniel Thompson",
      product: "Cable Management",
      quantity: 100,
      price: 150,
      tax: 8,
      paymentDate: "Scheduled for July 20, 2025",
      status: "pending",
    },
    {
      id: 20,
      name: "Ashley Anderson",
      product: "Power Strip",
      quantity: 75,
      price: 800,
      tax: 40,
      paymentDate: "June 01, 2025, 13:10:00 PM",
      status: "paid",
    },
  ],
  currentPage: 1,
  itemsPerPage: 7,
  sortBy: "",
  filterBy: "",
  isCreateModalOpen: false,
  isDetailModalOpen: false,
  isSuccessModalOpen: false,
  selectedInvoice: null,
};

// Action types
const ACTIONS = {
  ADD_INVOICE: "ADD_INVOICE",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_SORT_BY: "SET_SORT_BY",
  SET_FILTER_BY: "SET_FILTER_BY",
  OPEN_CREATE_MODAL: "OPEN_CREATE_MODAL",
  CLOSE_CREATE_MODAL: "CLOSE_CREATE_MODAL",
  OPEN_DETAIL_MODAL: "OPEN_DETAIL_MODAL",
  CLOSE_DETAIL_MODAL: "CLOSE_DETAIL_MODAL",
  OPEN_SUCCESS_MODAL: "OPEN_SUCCESS_MODAL",
  CLOSE_SUCCESS_MODAL: "CLOSE_SUCCESS_MODAL",
  SET_SELECTED_INVOICE: "SET_SELECTED_INVOICE",
};

// Reducer
function invoiceReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_INVOICE:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1, // Reset to first page when sorting
      };
    case ACTIONS.SET_FILTER_BY:
      return {
        ...state,
        filterBy: action.payload,
        currentPage: 1, // Reset to first page when filtering
      };
    case ACTIONS.OPEN_CREATE_MODAL:
      return {
        ...state,
        isCreateModalOpen: true,
      };
    case ACTIONS.CLOSE_CREATE_MODAL:
      return {
        ...state,
        isCreateModalOpen: false,
      };
    case ACTIONS.OPEN_DETAIL_MODAL:
      return {
        ...state,
        isDetailModalOpen: true,
        selectedInvoice: action.payload,
      };
    case ACTIONS.CLOSE_DETAIL_MODAL:
      return {
        ...state,
        isDetailModalOpen: false,
        selectedInvoice: null,
      };
    case ACTIONS.OPEN_SUCCESS_MODAL:
      return {
        ...state,
        isSuccessModalOpen: true,
      };
    case ACTIONS.CLOSE_SUCCESS_MODAL:
      return {
        ...state,
        isSuccessModalOpen: false,
      };
    default:
      return state;
  }
}

// Provider component
export function InvoiceProvider({ children }) {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  // Computed values
  const stats = useMemo(
    () => ({
      totalInvoices: 1250,
      invoicesDue: 100,
      invoicesProcessed: 1250,
      invoicesDownloaded: 1000,
    }),
    []
  );

  const filteredAndSortedInvoices = useMemo(() => {
    let filtered = [...state.invoices];

    // Apply filter
    if (state.filterBy) {
      filtered = filtered.filter((invoice) => {
        switch (state.filterBy) {
          case "paid":
            return invoice.status === "paid";
          case "pending":
            return invoice.status === "pending";
          default:
            return true;
        }
      });
    }

    // Apply sort
    if (state.sortBy) {
      filtered.sort((a, b) => {
        switch (state.sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price":
            return b.price - a.price;
          case "quantity":
            return b.quantity - a.quantity;
          case "date":
            return new Date(b.paymentDate) - new Date(a.paymentDate);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [state.invoices, state.filterBy, state.sortBy]);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredAndSortedInvoices.slice(startIndex, endIndex);
  }, [filteredAndSortedInvoices, state.currentPage, state.itemsPerPage]);

  const totalPages = Math.ceil(
    filteredAndSortedInvoices.length / state.itemsPerPage
  );

  // Actions
  const actions = {
    addInvoice: (invoice) => {
      const newInvoice = {
        id: state.invoices.length + 1,
        name: invoice.customerName,
        product: invoice.product,
        quantity: invoice.quantity,
        price: invoice.price,
        tax: invoice.tax,
        paymentDate: invoice.dueDate
          ? invoice.dueDate.toLocaleDateString()
          : "Pending",
        status: "pending",
      };
      dispatch({ type: ACTIONS.ADD_INVOICE, payload: newInvoice });
      dispatch({ type: ACTIONS.CLOSE_CREATE_MODAL });
      dispatch({ type: ACTIONS.OPEN_SUCCESS_MODAL });
    },
    setCurrentPage: (page) =>
      dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page }),
    setSortBy: (sortBy) =>
      dispatch({ type: ACTIONS.SET_SORT_BY, payload: sortBy }),
    setFilterBy: (filterBy) =>
      dispatch({ type: ACTIONS.SET_FILTER_BY, payload: filterBy }),
    openCreateModal: () => dispatch({ type: ACTIONS.OPEN_CREATE_MODAL }),
    closeCreateModal: () => dispatch({ type: ACTIONS.CLOSE_CREATE_MODAL }),
    openDetailModal: (invoice) =>
      dispatch({ type: ACTIONS.OPEN_DETAIL_MODAL, payload: invoice }),
    closeDetailModal: () => dispatch({ type: ACTIONS.CLOSE_DETAIL_MODAL }),
    openSuccessModal: () => dispatch({ type: ACTIONS.OPEN_SUCCESS_MODAL }),
    closeSuccessModal: () => dispatch({ type: ACTIONS.CLOSE_SUCCESS_MODAL }),
    downloadInvoices: () => {
      console.log("Downloading invoices...");
      // Implement download logic here
    },
  };

  const value = {
    ...state,
    stats,
    filteredAndSortedInvoices,
    paginatedInvoices,
    totalPages,
    ...actions,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

// Hook to use the context
export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
}
