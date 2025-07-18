// import React, { useState } from "react";
// import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

// const initialEmployees = [
//   {
//     date: "2023-08-24",
//     description: "office chairs",
//     amount: "350000",
//     type: "expenses",
//     source: "Office Supplies",
//     status: "Active",
//   },
//   {
//     name: "Ada Chioma",
//     phone: "08133344455",
//     email: "ada@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
//   {
//     name: "Ada Ben",
//     phone: "08133344455",
//     email: "ada@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
//   {
//     name: "Tana Ofik",
//     phone: "08133344455",
//     email: "tana@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
//   {
//     name: "Biola Adeyemi",
//     phone: "08133344455",
//     email: "ada@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
//   {
//     name: "Confidence Bassey",
//     phone: "08133344455",
//     email: "confidence@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
//   {
//     name: "Seun Adebayo",
//     phone: "08133344455",
//     email: "seun@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
// ];

// export default function Banking() {
//   const [selectedTab, setSelectedTab] = useState("list");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(initialEmployees.length / itemsPerPage);
//   const currentEmployees = initialEmployees.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="p-4">
//       {/* Search Box */}
//       <section>
//         <div className="p-4 bg-white border rounded-lg mb-6">
//           <p className="text-gray-500 text-sm">Search anything here...</p>
//         </div>
//       </section>

//       {/* Tab Navigation (optional) */}
//       <div className="mb-4">
//         <button
//           onClick={() => setSelectedTab("list")}
//           className={`px-4 py-2 mr-2 rounded ${
//             selectedTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100"
//           }`}
//         >
//           Transaction List
//         </button>
//       </div>

//       {selectedTab === "list" && (
//         <section className="bg-white border rounded-lg p-4 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Transaction</h2>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
//             >
//               Add New Transactions
//             </button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 border">Date</th>
//                   <th className="px-4 py-2 border">Description</th>
//                   <th className="px-4 py-2 border">Amount</th>
//                   <th className="px-4 py-2 border">Type</th>
//                   <th className="px-4 py-2 border">Source/Destination</th>

//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentEmployees.map((emp, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{emp.date}</td>
//                     <td className="px-4 py-2 border">{emp.description}</td>
//                     <td className="px-4 py-2 border">{emp.amount}</td>
//                     <td className="px-4 py-2 border">{emp.type}</td>
//                     <td className="px-4 py-2 border">{emp.source}</td>
//                     <td className="px-4 py-2 border">{emp.status}</td>
//                     <td className="px-4 py-2 border">₦{emp.action}</td>
//                     <td className="px-4 py-2 border">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                           emp.status === "Active"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {emp.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <div className="flex flex-col space-y-1">
//                         <button className="flex items-center text-blue-600 hover:text-blue-800">
//                           <FiEdit className="mr-1" /> Edit
//                         </button>
//                         <button className="flex items-center text-green-600 hover:text-green-800">
//                           <FiPlus className="mr-1" /> Add
//                         </button>
//                         <button className="flex items-center text-red-600 hover:text-red-800">
//                           <FiTrash2 className="mr-1" /> Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-6 space-x-1">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 text-sm rounded border ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const initialTransactions = [
  {
    date: "24/08/2023",
    description: "Office Chair",
    amount: "40,000",
    type: "Income",
    source: "Zenith Bank",
  },
  {
    date: "24/08/2023",
    description: "Laptop Computers",
    amount: "450,000",
    type: "Expense",
    source: "Access Bank",
  },
  {
    date: "24/08/2023",
    description: "Office Tables",
    amount: "100,000",
    type: "Income",
    source: "Providus Bank",
  },
  {
    date: "24/08/2023",
    description: "Office Chair",
    amount: "40,000",
    type: "Expense",
    source: "Cash",
  },
  {
    date: "24/08/2023",
    description: "Office Chair",
    amount: "400,000",
    type: "Income",
    source: "Cash",
  },
  {
    date: "24/08/2023",
    description: "Ceiling Fans",
    amount: "150,000",
    type: "Expense",
    source: "GTB Bank",
  },
];

const TransactionTable = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    type: "Income",
    source: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and paginate
  const filteredTransactions = transactions.filter((t) =>
    `${t.date} ${t.description} ${t.amount} ${t.type} ${t.source}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setTransactions([formData, ...transactions]);
    setFormData({
      date: "",
      description: "",
      amount: "",
      type: "Income",
      source: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      {/* Search bar */}
      <div className="p-4 bg-white border rounded-lg mb-6">
        <input
          type="text"
          placeholder="Search anything here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm outline-none"
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus /> Add New Transaction
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Source/Destination</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((t, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{t.date}</td>
                <td className="px-4 py-2">{t.description}</td>
                <td className="px-4 py-2">{t.amount}</td>
                <td className="px-4 py-2">{t.type}</td>
                <td className="px-4 py-2">{t.source}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600">
                    <FiEdit />
                  </button>
                  <button className="text-red-600">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-md text-2xl mt-6 mb-4">Add New Transaction</h3>
            <p className="text-gray-600 font-light mb-7">
              Enter transaction details to create a new record
            </p>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g. Office Chair"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g. 40000"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source/Destination
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g. Zenith Bank"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
