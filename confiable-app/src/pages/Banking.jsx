// import React, { useState } from "react";
// import { TrendingDown, TrendingUp } from "lucide-react";

// const Card = ({ title, count, growth, growthColor, action, icon: Icon, iconColor }) => (
//   <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col">
//     <div className="flex justify-between items-start mb-4">
//       <div>
//         <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
//         <div className="text-3xl font-bold text-gray-800">{count}</div>
//       </div>
//       <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10`} style={{ backgroundColor: `${iconColor}20` }}>
//         {Icon && <Icon className="text-xl" color={iconColor} />}
//       </div>
//     </div>
//     <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
//     <button className="text-blue-600 text-sm font-semibold hover:underline">
//       {action}
//     </button>
//   </div>
// );

// const TransactionTabs = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <>
//       <div className="p-4 rounded-xl shadow-md bg-indigo-700">
//         {/* Search bar */}
//         <div className="p-4 bg-white border rounded-lg mb-6 mt-2">
//           <input
//             type="text"
//             placeholder="search anything here..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg text-sm outline-none"
//             aria-label="Search"
//           />
//         </div>

//         {/* Tabs */}
//         <div className="bg-white border rounded-lg p-4">
//           <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
//             {["Purchase Order", "Stock Transaction", "Sales Order", "Account", "Customer"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-xl text-sm transition ${
//                     activeTab === tab
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200 hover:bg-blue-600 hover:text-white"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               )
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
//         <Card
//           title="Total Revenue"
//           count="120"
//           growthColor="text-green-500"
//           icon={TrendingUp}
//           iconColor="#22c55e"
//         />
//         <Card
//           title="Total Expenses"
//           count="77"
//           growthColor="text-green-500"
//           icon={TrendingDown}
//           iconColor="red"
//         />
//         <Card
//           title="Net Profit"
//           count="20"
//           growthColor="text-green-500"
//           icon={TrendingDown}
//           iconColor="red"
//         />
//         <Card
//           title="Cash Flows"
//           count="17"
          
//         />
//       </div>
//     </>
//   );
// };

// export default TransactionTabs;

import React, { useState, useEffect, useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

const Card = ({ title, count, growth, growthColor, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10 ${iconColor}`}>
        {Icon && <Icon className="text-xl" />}
      </div>
    </div>
    <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
    <button
      className="text-blue-600 text-sm font-semibold hover:underline"
      aria-label={`View details for ${title}`}
    >
      {action}
    </button>
  </div>
);

const TransactionTabs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: "",
    expectedDeliveryDate: "",
    status: "",
    totalAmount: "",
    createdBy: "",
  });
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      poId: 1,
      supplier: "Supplier 23",
      orderDate: "2016-12-18",
      expectedDeliveryDate: "2024-07-22",
      status: "Pending",
      totalAmount: 841.98,
      createdBy: "User 23",
    },
    {
      poId: 2,
      supplier: "Supplier 27",
      orderDate: "2023-05-04",
      expectedDeliveryDate: "2024-09-12",
      status: "Cancelled",
      totalAmount: 1592.82,
      createdBy: "User 23",
    },
    {
      poId: 3,
      supplier: "Supplier 25",
      orderDate: "2020-11-28",
      expectedDeliveryDate: "2024-11-07",
      status: "Received",
      totalAmount: 4326.32,
      createdBy: "User 20",
    },
    {
      poId: 4,
      supplier: "Supplier 26",
      orderDate: "2020-01-09",
      expectedDeliveryDate: "2025-02-09",
      status: "Pending",
      totalAmount: 4083.02,
      createdBy: "User 19",
    },
    {
      poId: 5,
      supplier: "Supplier 26",
      orderDate: "2022-04-02",
      expectedDeliveryDate: "2025-01-21",
      status: "Pending",
      totalAmount: 2062.42,
      createdBy: "User 14",
    },
    {
      poId: 6,
      supplier: "Supplier 22",
      orderDate: "2017-09-28",
      expectedDeliveryDate: "2025-02-21",
      status: "Received",
      totalAmount: 810.31,
      createdBy: "User 21",
    },
    {
      poId: 7,
      supplier: "Supplier 11",
      orderDate: "2019-05-22",
      expectedDeliveryDate: "2025-01-02",
      status: "Pending",
      totalAmount: 4323.09,
      createdBy: "User 27",
    },
    {
      poId: 8,
      supplier: "Supplier 16",
      orderDate: "2023-06-19",
      expectedDeliveryDate: "2025-03-11",
      status: "Pending",
      totalAmount: 2450.86,
      createdBy: "User 12",
    },
  ]);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (isSuccessToastOpen) {
      const timer = setTimeout(() => {
        setIsSuccessToastOpen(false);
        setActiveTab("purchase-order");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccessToastOpen]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "purchase-order", label: "Purchase Order" },
    { id: "stock-transaction", label: "Stock Transaction" },
    { id: "sales-order", label: "Sales Order" },
    { id: "account", label: "Account" },
    { id: "customer", label: "Customer" },
  ];

  const cardData = [
    {
      title: "Total Revenue",
      count: "120",
      growth: "+5.2%",
      growthColor: "text-green-500",
      action: "View Details",
      icon: TrendingUp,
      iconColor: "bg-green-500",
    },
    {
      title: "Total Expenses",
      count: "77",
      growth: "-2.1%",
      growthColor: "text-red-500",
      action: "View Details",
      icon: TrendingDown,
      iconColor: "bg-red-500",
    },
    {
      title: "Net Profit",
      count: "20",
      growth: "+1.8%",
      growthColor: "text-green-500",
      action: "View Details",
      icon: TrendingUp,
      iconColor: "bg-green-500",
    },
    {
      title: "Cash Flows",
      count: "17",
      growth: "-0.5%",
      growthColor: "text-red-500",
      action: "View Details",
      icon: TrendingDown,
      iconColor: "bg-red-500",
    },
  ];

  // Form handling for both add and edit
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.supplier ||
      !formData.orderDate ||
      !formData.expectedDeliveryDate ||
      !formData.status ||
      !formData.totalAmount ||
      !formData.createdBy
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (isNaN(formData.totalAmount) || formData.totalAmount <= 0) {
      alert("Total Amount must be a positive number.");
      return;
    }
    if (new Date(formData.orderDate) > new Date(formData.expectedDeliveryDate)) {
      alert("Order Date must be before Expected Delivery Date.");
      return;
    }
    setPurchaseOrders((prev) => [
      ...prev,
      {
        poId: prev.length + 1,
        supplier: formData.supplier,
        orderDate: formData.orderDate,
        expectedDeliveryDate: formData.expectedDeliveryDate,
        status: formData.status,
        totalAmount: parseFloat(formData.totalAmount),
        createdBy: formData.createdBy,
      },
    ]);
    setFormData({
      supplier: "",
      orderDate: "",
      expectedDeliveryDate: "",
      status: "",
      totalAmount: "",
      createdBy: "",
    });
    setIsAddModalOpen(false);
    setIsSuccessToastOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.supplier ||
      !formData.orderDate ||
      !formData.expectedDeliveryDate ||
      !formData.status ||
      !formData.totalAmount ||
      !formData.createdBy
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (isNaN(formData.totalAmount) || formData.totalAmount <= 0) {
      alert("Total Amount must be a positive number.");
      return;
    }
    if (new Date(formData.orderDate) > new Date(formData.expectedDeliveryDate)) {
      alert("Order Date must be before Expected Delivery Date.");
      return;
    }
    setPurchaseOrders((prev) =>
      prev.map((order) =>
        order.poId === editOrderId
          ? {
              ...order,
              supplier: formData.supplier,
              orderDate: formData.orderDate,
              expectedDeliveryDate: formData.expectedDeliveryDate,
              status: formData.status,
              totalAmount: parseFloat(formData.totalAmount),
              createdBy: formData.createdBy,
            }
          : order
      )
    );
    setFormData({
      supplier: "",
      orderDate: "",
      expectedDeliveryDate: "",
      status: "",
      totalAmount: "",
      createdBy: "",
    });
    setIsEditModalOpen(false);
    setEditOrderId(null);
  };

  const handleEditClick = (order) => {
    setFormData({
      supplier: order.supplier,
      orderDate: order.orderDate,
      expectedDeliveryDate: order.expectedDeliveryDate,
      status: order.status,
      totalAmount: order.totalAmount.toString(),
      createdBy: order.createdBy,
    });
    setEditOrderId(order.poId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (poId) => {
    if (window.confirm(`Are you sure you want to delete purchase order ${poId}?`)) {
      setPurchaseOrders((prev) => prev.filter((order) => order.poId !== poId));
    }
  };

  // Filter purchase orders based on search query
  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((order) =>
      Object.values(order).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [purchaseOrders, searchQuery]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Search bar */}
      <div className="p-4 bg-white border rounded-lg mb-6 mt-2">
        <input
          type="text"
          placeholder="Search purchase orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm outline-none"
          aria-label="Search purchase orders"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Success Toast */}
      {isSuccessToastOpen && (
        <div
          className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md max-w-sm z-50"
          role="alert"
          aria-live="polite"
        >
          <h3 className="text-sm font-semibold">New purchase order added successfully</h3>
          <p className="text-sm">A new purchase order has been successfully added to the list</p>
          <button
            onClick={() => {
              setIsSuccessToastOpen(false);
              setActiveTab("purchase-order");
            }}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            aria-label="Go to purchase order list"
          >
            Go to Purchase Order List
          </button>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {cardData.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              count={card.count}
              growth={card.growth}
              growthColor={card.growthColor}
              action={card.action}
              icon={card.icon}
              iconColor={card.iconColor}
            />
          ))}
        </div>
      )}

      {activeTab === "purchase-order" && (
        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              aria-label="Add new purchase order"
            >
              Add Purchase Order
            </button>
          </div>
          <div className="bg-white border rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Purchase Order</th>
                  <th scope="col" className="px-6 py-3">Supplier</th>
                  <th scope="col" className="px-6 py-3">Order Date</th>
                  <th scope="col" className="px-6 py-3">Expected Delivery</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Total Amount</th>
                  <th scope="col" className="px-6 py-3">Created By</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.poId} className="border-b">
                      <td scope="row" className="px-6 py-4">{order.poId}</td>
                      <td className="px-6 py-4">{order.supplier}</td>
                      <td className="px-6 py-4">{order.orderDate}</td>
                      <td className="px-6 py-4">{order.expectedDeliveryDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Received"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">${order.totalAmount}</td>
                      <td className="px-6 py-4">{order.createdBy}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditClick(order)}
                          className="text-blue-600 hover:underline text-sm"
                          aria-label={`Edit purchase order ${order.poId}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(order.poId)}
                          className="text-red-600 hover:underline text-sm ml-4"
                          aria-label={`Delete purchase order ${order.poId}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No purchase orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm disabled:opacity-50"
                aria-label="Previous page"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm disabled:opacity-50"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Purchase Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Purchase Order</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                  Supplier
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter supplier (e.g., TFC Holdings)"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
                  Order Date
                </label>
                <input
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  id="expectedDeliveryDate"
                  name="expectedDeliveryDate"
                  value={formData.expectedDeliveryDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                >
                  <option value="" disabled>
                    Choose status
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                  Total Amount
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter total amount"
                  min="0"
                  step="0.01"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter creator (e.g., Tobi Akin)"
                  aria-required="true"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setFormData({
                      supplier: "",
                      orderDate: "",
                      expectedDeliveryDate: "",
                      status: "",
                      totalAmount: "",
                      createdBy: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
                  aria-label="Cancel adding purchase order"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  aria-label="Submit purchase order"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Purchase Order Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Purchase Order</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                  Supplier
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter supplier (e.g., TFC Holdings)"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
                  Order Date
                </label>
                <input
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  id="expectedDeliveryDate"
                  name="expectedDeliveryDate"
                  value={formData.expectedDeliveryDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  aria-required="true"
                >
                  <option value="" disabled>
                    Choose status
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                  Total Amount
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter total amount"
                  min="0"
                  step="0.01"
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                  placeholder="Enter creator (e.g., Tobi Akin)"
                  aria-required="true"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditOrderId(null);
                    setFormData({
                      supplier: "",
                      orderDate: "",
                      expectedDeliveryDate: "",
                      status: "",
                      totalAmount: "",
                      createdBy: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
                  aria-label="Cancel editing purchase order"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  aria-label="Save changes to purchase order"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTabs;