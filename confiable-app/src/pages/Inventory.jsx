import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiCheckCircle, FiUserPlus } from "react-icons/fi";

const Card = ({ title, count, text, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${iconColor}20` }}>
        {Icon && <Icon className="text-xl" color={iconColor} />}
      </div>
    </div>
    <p className="text-sm text-gray-500 font-medium mb-2">{text}</p>
    <button className="text-blue-600 text-sm font-semibold hover:underline">
      {action}
    </button>
  </div>
);

export default function EmployeeOverview() {
  const transactions = [
    { id: "TXN001", product: "Product A", type: "Stock In", quantity: 50, from: "Supplier X", to: "Warehouse 1", date: "2024-06-01", performedBy: "John Doe" },
    { id: "TXN002", product: "Product B", type: "Stock Out", quantity: 20, from: "Warehouse 1", to: "Store 2", date: "2024-06-02", performedBy: "Jane Smith" },
    { id: "TXN003", product: "Product C", type: "Stock Out", quantity: 30, from: "Warehouse 1", to: "Store 3", date: "2024-06-03", performedBy: "Alice Johnson" },
    { id: "TXN004", product: "Product D", type: "Stock Out", quantity: 15, from: "Warehouse 2", to: "Store 4", date: "2024-06-04", performedBy: "Bob Brown" },
    { id: "TXN005", product: "Product E", type: "Stock Out", quantity: 25, from: "Warehouse 3", to: "Store 5", date: "2024-06-05", performedBy: "Carol White" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <section className="p-2 sm:p-4">
        <div className="bg-white border rounded-lg mb-6 p-4">
          <p className="text-gray-500 text-sm">Search anything here...</p>
        </div>

        <div className="bg-white border rounded-lg mb-6 p-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <Link to="/product-overview">
              <button className="px-4 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Product Overview
              </button>
            </Link>
            <Link to="/products">
              <button className="px-4 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Products
              </button>
            </Link>
            <Link to="/inventory">
              <button className="px-4 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Inventory
              </button>
            </Link>
            <Link to="/warehouse">
              <button className="px-4 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Warehouse
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            title="Stock In Today"
            count="120"
            text="items received"
            action="View Details"
            icon={FiUsers}
            iconColor="#16a34a"
          />
          <Card
            title="Stock Out Today"
            count="580"
            text="items dispatched"
            action="View Details"
            icon={FiCheckCircle}
            iconColor="#0ea5e9"
          />
          <Card
            title="Transfers"
            count="25"
            text="warehouse transfers"
            action="Review Transfers"
            icon={FiUserPlus}
            iconColor="#dc2626"
          />
          <Card
            title="Adjustments"
            count="15"
            text="stock changes"
            action="Audit Adjustments"
            icon={FiUserPlus}
            iconColor="#f59e0b"
          />
        </div>
      </section>

      <section className="p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Transaction History</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 font-medium text-left">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">Type</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Source / Destination</th>
                <th className="p-3">Date</th>
                <th className="p-3">Performed By</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((tx, idx) => (
                <tr key={`${tx.id}-${idx}`} className="border-t hover:bg-gray-50">
                  <td className="p-3">{tx.id}</td>
                  <td className="p-3">{tx.product}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.type === "Stock In"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">{tx.quantity}</td>
                  <td className="p-3 whitespace-pre-wrap">
                    <div>From: {tx.from}</div>
                    <div>To: {tx.to}</div>
                  </td>
                  <td className="p-3">{tx.date}</td>
                  <td className="p-3">{tx.performedBy}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 p-3 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
