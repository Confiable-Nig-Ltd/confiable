import React, { useState } from 'react';
import {
  FiEdit,
  FiPlus,
  FiTrash2,
  FiRepeat,
  FiSettings,
} from 'react-icons/fi';
import { TrendingUp } from 'lucide-react';

const Card = ({ title, count, text, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${iconColor}20` }}
      >
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
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5;

  const products = [
    { name: "Office Chair", category: "Furniture", unit: "Each", price: "40,000.00", costPrice: "35,000.00", reorderLevel: 30, status: "Active", description: "Ergonomic office chair with lumbar support" },
    { name: "Laptop Computer", category: "Electronics", unit: "Each", price: "80,000.00", costPrice: "70,000.00", reorderLevel: 5, status: "Active", description: "Business laptop with 8GB RAM" },
    { name: "Printer Paper", category: "Stationery", unit: "Team", price: "120,000.00", costPrice: "105,000.00", reorderLevel: 20, status: "Active", description: "A4 size white paper" },
    { name: "Desk Lamp", category: "Electronics", unit: "Each", price: "60,000.00", costPrice: "50,000.00", reorderLevel: 10, status: "Active", description: "LED desk lamp with adjustable brightness" },
    { name: "Desk Lamp", category: "Electronics", unit: "Each", price: "10,000.00", costPrice: "5,000.00", reorderLevel: 60, status: "Active", description: "LED desk lamp with adjustable brightness" },
  ];

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="p-2 sm:p-4">
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {["overview", "products", "inventory", "warehouse"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card title="Stock In Today" count="120" text="items received" action="View Details" icon={TrendingUp} iconColor="#16a34a" />
            <Card title="Stock Out Today" count="580" text="items dispatched" action="View Details" icon={TrendingUp} iconColor="red" />
            <Card title="Transfers" count="25" text="warehouse transfers" action="Review Transfers" icon={FiRepeat} iconColor="#3b82f6" />
            <Card title="Adjustments" count="15" text="stock changes" action="Audit Adjustments" icon={FiSettings} iconColor="#f59e0b" />
          </div>
        </>
      )}

      {activeTab === "products" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Product Catalog</h2>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlus /> Add New Product
            </button>
          </div>

          <div className="overflow-auto bg-white border rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Cost Price</th>
                  <th className="p-3">Re-order Level</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-t">
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">{product.unit}</td>
                      <td className="p-3">{product.price}</td>
                      <td className="p-3">{product.costPrice}</td>
                      <td className="p-3">{product.reorderLevel}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                          {product.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FiEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                    <tr className="text-gray-500 text-sm border-b">
                      <td className="px-3 pb-3 italic" colSpan={8}>
                        {product.description}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold mb-4">Add New Product</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Name" className="input border px-3 py-2 rounded w-full" />
                  <input type="text" placeholder="Category" className="input border px-3 py-2 rounded w-full" />
                  <input type="text" placeholder="Unit" className="input border px-3 py-2 rounded w-full" />
                  <input type="number" placeholder="Price" className="input border px-3 py-2 rounded w-full" />
                  <input type="number" placeholder="Cost Price" className="input border px-3 py-2 rounded w-full" />
                  <input type="number" placeholder="Re-order Level" className="input border px-3 py-2 rounded w-full" />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "inventory" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Inventory</h2>
          <p className="text-gray-600">Inventory status and controls go here.</p>
        </section>
      )}

      {activeTab === "warehouse" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Warehouse</h2>
          <p className="text-gray-600">Warehouse overview or management tools go here.</p>
        </section>
      )}
    </div>
  );
}
