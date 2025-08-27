// import React, { useState } from 'react';
// import {
//   FiEdit,
//   FiPlus,
//   FiTrash2,
//   FiRepeat,
//   FiSettings,
// } from 'react-icons/fi';
// import { TrendingUp } from 'lucide-react';

// const Card = ({ title, count, text, action, icon: Icon, iconColor }) => (
//   <div className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col justify-between">
//     <div className="flex justify-between items-start mb-4">
//       <div>
//         <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
//         <div className="text-3xl font-bold text-gray-800">{count}</div>
//       </div>
//       <div
//         className="w-10 h-10 rounded-full flex items-center justify-center"
//         style={{ backgroundColor: `${iconColor}20` }}
//       >
//         {Icon && <Icon className="text-xl" color={iconColor} />}
//       </div>
//     </div>
//     <p className="text-sm text-gray-500 font-medium mb-2">{text}</p>
//     <button className="text-blue-600 text-sm font-semibold hover:underline">
//       {action}
//     </button>
//   </div>
// );

// export default function EmployeeOverview() {
//   const [activeTab, setActiveTab] = useState("overview");
//   // Separate pagination states
//   const [transactionPage, setTransactionPage] = useState(1);
//   const [productPage, setProductPage] = useState(1);
//   const [inventoryPage, setInventoryPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Constants for items per page
//   const TRANSACTIONS_PER_PAGE = 2;
//   const PRODUCTS_PER_PAGE = 5;
//   const INVENTORY_PER_PAGE = 5;

//   // Data
//   const products = [
//     {
//       name: "Office Chair",
//       category: "Furniture",
//       unit: "Each",
//       price: "40,000.00",
//       costPrice: "35,000.00",
//       reorderLevel: 30,
//       status: "Active",
//       description: "Ergonomic office chair with lumbar support"
//     },
//     {
//       name: "Laptop Computer",
//       category: "Electronics",
//       unit: "Each",
//       price: "80,000.00",
//       costPrice: "70,000.00",
//       reorderLevel: 5,
//       status: "Active",
//       description: "Business laptop with 8GB RAM"
//     },
//     {
//       name: "Printer Paper",
//       category: "Stationery",
//       unit: "Team",
//       price: "120,000.00",
//       costPrice: "105,000.00",
//       reorderLevel: 20,
//       status: "Active",
//       description: "A4 size white paper"
//     },
//     {
//       name: "Desk Lamp",
//       category: "Electronics",
//       unit: "Each",
//       price: "60,000.00",
//       costPrice: "50,000.00",
//       reorderLevel: 10,
//       status: "Active",
//       description: "LED desk lamp with adjustable brightness"
//     },
//     {
//       name: "Scanner",
//       category: "Electronics",
//       unit: "Each",
//       price: "75,000.00",
//       costPrice: "60,000.00",
//       reorderLevel: 8,
//       status: "Active",
//       description: "High-speed document scanner"
//     }
//   ];

//   const inventoryData = [
//     {
//       name: 'Office Chair',
//       category: 'Furniture',
//       unit: 'Each',
//       price: 40000,
//       costPrice: 35000,
//       reorderLevel: 30,
//       description: 'Ergonomic office chair with lumbar support',
//       status: 'Active',
//     },
//     {
//       name: 'Laptop Computer',
//       category: 'Electronics',
//       unit: 'Each',
//       price: 80000,
//       costPrice: 70000,
//       reorderLevel: 5,
//       description: 'Business laptop with 8GB RAM',
//       status: 'Active',
//     },
//     {
//       name: 'Printer Paper',
//       category: 'Stationery',
//       unit: 'Team',
//       price: 120000,
//       costPrice: 105000,
//       reorderLevel: 20,
//       description: 'A4 size white paper',
//       status: 'Active',
//     },
//     {
//       name: 'Desk Lamp',
//       category: 'Electronics',
//       unit: 'Each',
//       price: 60000,
//       costPrice: 50000,
//       reorderLevel: 10,
//       description: 'LED desk lamp with adjustable brightness',
//       status: 'Active',
//     },
//     {
//       name: 'Scanner',
//       category: 'Electronics',
//       unit: 'Each',
//       price: 75000,
//       costPrice: 60000,
//       reorderLevel: 8,
//       description: 'High-speed document scanner',
//       status: 'Active',
//     },
//     {
//       name: 'Scanner',
//       category: 'Electronics',
//       unit: 'Each',
//       price: 75000,
//       costPrice: 60000,
//       reorderLevel: 8,
//       description: 'High-speed document scanner',
//       status: 'Active',
//     },
//     {
//       name: 'Scanner',
//       category: 'Electronics',
//       unit: 'Each',
//       price: 75000,
//       costPrice: 60000,
//       reorderLevel: 8,
//       description: 'High-speed document scanner',
//       status: 'Active',
//     },
//   ];

//   const transactions = [
//     {
//       id: "ST-001",
//       product: "Office chair",
//       type: "Stock In",
//       quantity: "+25",
//       source: "From: Purchase Order PO-001",
//       destination: "To: Main Warehouse",
//       date: "15/01/2025, 10:30:00 AM",
//       performedBy: "Taiwo Akinkunmi",
//     },
//     {
//       id: "ST-002",
//       product: "Laptop Computer",
//       type: "Stock Out",
//       quantity: "-10",
//       source: "From: Main Warehouse",
//       destination: "To: Sales Order",
//       date: "17/01/2025, 14:21:00 PM",
//       performedBy: "Mercy Johnson",
//     },
//     {
//       id: "ST-003",
//       product: "Printer Paper",
//       type: "Stock In",
//       quantity: "+30",
//       source: "From: Purchase Order PO-001",
//       destination: "To: Main Warehouse",
//       date: "20/01/2025, 8:17:00 AM",
//       performedBy: "Ifeoluwa Thomas",
//     },
//     {
//       id: "ST-004",
//       product: "Desk Lamp",
//       type: "Stock In",
//       quantity: "+40",
//       source: "From: Purchase Order PO-001",
//       destination: "To: Main Warehouse",
//       date: "22/01/2025, 11:00:00 AM",
//       performedBy: "Eze Chisom",
//     },
//     // Add more transactions as needed
//   ];

//   // Helper for generating pagination buttons
//   const getPageButtons = (total, current, setPage) =>
//     Array.from({ length: total }, (_, i) => (
//       <button
//         key={i}
//         className={`w-8 h-8 rounded ${
//           current === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
//         }`}
//         onClick={() => setPage(i + 1)}
//       >
//         {i + 1}
//       </button>
//     ));

//   // Calculate total pages
//   const totalTransactionPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
//   const totalProductPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
//   const totalInventoryPages = Math.ceil(inventoryData.length / INVENTORY_PER_PAGE);

//   // Get paginated data
//   const paginatedTransactions = transactions.slice(
//     (transactionPage - 1) * TRANSACTIONS_PER_PAGE,
//     transactionPage * TRANSACTIONS_PER_PAGE
//   );

//   const paginatedProducts = products.slice(
//     (productPage - 1) * PRODUCTS_PER_PAGE,
//     productPage * PRODUCTS_PER_PAGE
//   );

//   const paginatedInventory = inventoryData.slice(
//     (inventoryPage - 1) * INVENTORY_PER_PAGE,
//     inventoryPage * INVENTORY_PER_PAGE
//   );

//   // Count products below reorder level
//   const belowReorderCount = inventoryData.filter(item => item.reorderLevel < 15).length;

//   return (
//     <div className="p-2 sm:p-4 bg-indigo-900">
//       {/* Tabs */}
//       <div className="bg-white border rounded-lg p-4 mb-6">
//         <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
//           {["overview", "products", "inventory", "warehouse", "supplier"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-xl text-sm ${
//                 activeTab === tab
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 hover:bg-blue-600 hover:text-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Overview Tab */}
//       {activeTab === "overview" && (
//         <>
//           {/* Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <Card
//               title="Stock In Today"
//               count="120"
//               text="items received"
//               action="View Details"
//               icon={TrendingUp}
//               iconColor="#16a34a"
//             />
//             <Card
//               title="Stock Out Today"
//               count="580"
//               text="items dispatched"
//               action="View Details"
//               icon={TrendingUp}
//               iconColor="red"
//             />
//             <Card
//               title="Transfers"
//               count="25"
//               text="warehouse transfers"
//               action="Review Transfers"
//               icon={FiRepeat}
//               iconColor="#3b82f6"
//             />
//             <Card
//               title="Adjustments"
//               count="15"
//               text="stock changes"
//               action="Audit Adjustments"
//               icon={FiSettings}
//               iconColor="#f59e0b"
//             />
//           </div>

//           {/* Transaction History */}
//           <div className="p-4 bg-white rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-600">
//                   <tr>
//                     <th className="py-2 px-3">Transaction ID</th>
//                     <th className="py-2 px-3">Product</th>
//                     <th className="py-2 px-3">Type</th>
//                     <th className="py-2 px-3">Quantity</th>
//                     <th className="py-2 px-3">Source/Destination</th>
//                     <th className="py-2 px-3">Date</th>
//                     <th className="py-2 px-3">Performed by</th>
//                     <th className="py-2 px-3">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedTransactions.map((txn, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="py-2 px-3">{txn.id}</td>
//                       <td className="py-2 px-3">{txn.product}</td>
//                       <td
//                         className={`py-2 px-3 font-medium ${
//                           txn.type === "Stock In" ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {txn.type}
//                       </td>
//                       <td className="py-2 px-3">{txn.quantity}</td>
//                       <td className="py-2 px-3">
//                         <div>{txn.source}</div>
//                         <div>{txn.destination}</div>
//                       </td>
//                       <td className="py-2 px-3">{txn.date}</td>
//                       <td className="py-2 px-3">{txn.performedBy}</td>
//                       <td className="py-2 px-3 flex gap-2">
//                         <button className="text-blue-500 hover:text-blue-700">
//                           <FiEdit />
//                         </button>
//                         <button className="text-red-500 hover:text-red-700">
//                           <FiTrash2 />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination */}
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 onClick={() => setTransactionPage((p) => Math.max(p - 1, 1))}
//                 disabled={transactionPage === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               {getPageButtons(totalTransactionPages, transactionPage, setTransactionPage)}
//               <button
//                 onClick={() => setTransactionPage((p) => Math.min(p + 1, totalTransactionPages))}
//                 disabled={transactionPage === totalTransactionPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Products Tab */}
//       {activeTab === "products" && (
//         <section className="bg-white p-6 rounded-xl shadow mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-700">Product Catalog</h2>
//             <button
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <FiPlus /> Add New Product
//             </button>
//           </div>

//           {/* Product Table */}
//           <div className="overflow-auto bg-white border rounded-lg shadow">
//             <table className="w-full text-sm text-left text-gray-600">
//               <thead className="bg-gray-100 text-xs uppercase text-gray-500">
//                 <tr>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Category</th>
//                   <th className="p-3">Unit</th>
//                   <th className="p-3">Price</th>
//                   <th className="p-3">Cost Price</th>
//                   <th className="p-3">Re-order Level</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedProducts.map((product, index) => (
//                   <React.Fragment key={index}>
//                     <tr className="border-t">
//                       <td className="p-3 font-medium">{product.name}</td>
//                       <td className="p-3">{product.category}</td>
//                       <td className="p-3">{product.unit}</td>
//                       <td className="p-3">{product.price}</td>
//                       <td className="p-3">{product.costPrice}</td>
//                       <td className="p-3">{product.reorderLevel}</td>
//                       <td className="p-3">
//                         <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
//                           {product.status}
//                         </span>
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         <button className="text-blue-600 hover:text-blue-800">
//                           <FiEdit />
//                         </button>
//                         <button className="text-red-600 hover:text-red-800">
//                           <FiTrash2 />
//                         </button>
//                       </td>
//                     </tr>
//                     <tr className="text-gray-500 text-sm border-b">
//                       <td className="px-3 pb-3 italic" colSpan={8}>
//                         {product.description}
//                       </td>
//                     </tr>
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination for products */}
//           <div className="flex justify-end items-center gap-2 mt-4">
//             {getPageButtons(totalProductPages, productPage, setProductPage)}
//           </div>

//           {/* Modal for adding product */}
//           {isModalOpen && (
//            <div
//       className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
//       onClick={() => setIsModalOpen(false)}
//     >
//       <div
//         className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-auto min-h-[400px] sm:min-h-[500px] max-h-[90vh]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Icon */}
//         <button
//           className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
//           onClick={() => setIsModalOpen(false)}
//           aria-label="Close modal"
//         >
//           ×
//         </button>

//         {/* Modal Header */}
//         <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center justify-between">
//           Add New Product
//         </h3>
//         {/* Description */}
//         <p className="text-xs sm:text-sm font-light mb-4 sm:mb-6">
//           Enter product information to create a new record
//         </p>

//         {/* Form Fields */}
//         <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
//           <label className="block">
//             <span className="text-xs sm:text-sm">Name</span>
//             <input
//               type="text"
//               className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
//               placeholder="Enter product name"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm">Category</span>
//             <input
//               type="text"
//               className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
//               placeholder="Enter category"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm">Unit</span>
//             <input
//               type="text"
//               className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
//               placeholder="Enter unit"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm">Price</span>
//             <input
//               type="number"
//               className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
//               placeholder="Enter price"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm">Cost Price</span>
//             <input
//               type="number"
//               className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
//               placeholder="Enter cost price"
//             />
//           </label>
          
//         </div>

//         {/* Save Button */}
//         <div className="mt-4 pb-4 sm:pb-6">
//           <button
//             className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base font-medium"
//             onClick={() => setIsModalOpen(false)}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//           )}
//         </section>
//       )}

//       {/* Inventory Tab */}
//       {activeTab === "inventory" && (
//         <section className="bg-white p-6 rounded-xl shadow mb-6">
//           {belowReorderCount > 0 && (
//             <div className="mb-4 p-4 bg-red-500 text-yellow-800 rounded-md border border-yellow-300">
//               ⚠️ Warning: {belowReorderCount} product{belowReorderCount > 1 ? 's are' : ' is'} below reorder level
//             </div>
//           )}

//           {/* Inventory Table */}
//           <table className="w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Category</th>
//                 <th className="px-4 py-3">Unit</th>
//                 <th className="px-4 py-3">Price</th>
//                 <th className="px-4 py-3">Cost Price</th>
//                 <th className="px-4 py-3">Re-order level</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedInventory.map((item, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     <div className="font-semibold">{item.name}</div>
//                     <div className="text-gray-500 text-xs">{item.description}</div>
//                   </td>
//                   <td className="px-4 py-3">{item.category}</td>
//                   <td className="px-4 py-3">{item.unit}</td>
//                   <td className="px-4 py-3">₦{item.price.toLocaleString()}</td>
//                   <td className="px-4 py-3">₦{item.costPrice.toLocaleString()}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         item.reorderLevel < 15 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                       }`}
//                     >
//                       {item.reorderLevel}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="text-green-600 font-semibold text-sm">{item.status}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                     <button className="text-red-600 hover:underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination for inventory */}
//           <div className="flex justify-end items-center gap-2 mt-4">
//             {getPageButtons(totalInventoryPages, inventoryPage, setInventoryPage)}
//           </div>
//         </section>
//       )}
      

//       {/* Warehouse Tab */}
//       {activeTab === "warehouse" && (
//         <section className="bg-white p-6 rounded-xl shadow mb-6">
//           <h2 className="text-xl font-semibold mb-2">Warehouse</h2>
//           <p className="text-gray-600">Manage warehouse locations and inventory distribution</p>
//           <button className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 flex justify-end items-center mt-4">
//             Add Warehouse
//           </button>
//         </section>
//       )}

//     </div>
//   );
// }


import React, { useState } from 'react';
import { FiEdit, FiPlus, FiTrash2, FiRepeat, FiSettings } from 'react-icons/fi';
import { TrendingUp } from 'lucide-react';

const Card = ({ title, count, text, action, icon: Icon, iconColor, onActionClick }) => (
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
    <button
      className="text-blue-600 text-sm font-semibold hover:underline"
      onClick={onActionClick}
    >
      {action}
    </button>
  </div>
);

const EmployeeOverview = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [transactionPage, setTransactionPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [inventoryPage, setInventoryPage] = useState(1);
  const [warehousePage, setWarehousePage] = useState(1);
  const [supplierPage, setSupplierPage] = useState(1);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [isTransfersModalOpen, setIsTransfersModalOpen] = useState(false);
  const [isAdjustmentsModalOpen, setIsAdjustmentsModalOpen] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '',
    unit: '',
    price: '',
    costPrice: '',
    reorderLevel: '',
    status: 'Active',
    description: '',
  });
  const [warehouseFormData, setWarehouseFormData] = useState({
    name: '',
    location: '',
    contactPerson: '',
  });
  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
    taxId: '',
    bankAccountNumber: '',
    status: 'Active',
  });
  const [inventoryFormData, setInventoryFormData] = useState({
    productName: '',
    warehouseName: '',
    quantityOnHand: '',
    lastUpdated: '2025-08-11',
  });
  const [productFormErrors, setProductFormErrors] = useState({});
  const [warehouseFormErrors, setWarehouseFormErrors] = useState({});
  const [supplierFormErrors, setSupplierFormErrors] = useState({});
  const [inventoryFormErrors, setInventoryFormErrors] = useState({});
  const [products, setProducts] = useState([
    {
      name: "Office Chair",
      category: "Furniture",
      unit: "Each",
      price: "40000",
      costPrice: "35000",
      "tax_rate": 14.51,
      reorderLevel: 30,
      status: "Active",
      description: "Ergonomic office chair with lumbar support"
    },
    {
      name: "Laptop Computer",
      category: "Electronics",
      unit: "Each",
      price: "80000",
      costPrice: "70000",
      "tax_rate": 14.51,
      reorderLevel: 5,
      status: "Active",
      description: "Business laptop with 8GB RAM"
    },
    {
      name: "Printer Paper",
      category: "Stationery",
      unit: "Ream",
      price: "120000",
      costPrice: "105000",
      "tax_rate": 14.51,
      reorderLevel: 20,
      status: "Active",
      description: "A4 size white paper"
    },
    {
      name: "Desk Lamp",
      category: "Electronics",
      unit: "Each",
      price: "60000",
      costPrice: "50000",
      "tax_rate": 14.51,
      reorderLevel: 10,
      status: "Active",
      description: "LED desk lamp with adjustable brightness"
    },
    {
      name: "Scanner",
      category: "Electronics",
      unit: "Each",
      price: "75000",
      costPrice: "60000",
      "tax_rate": 14.51,
      reorderLevel: 8,
      status: "Active",
      description: "High-speed document scanner"
    }
  ]);
  const [inventoryData, setInventoryData] = useState([
    {
      name: 'Office Chair',
      category: 'Furniture',
      unit: 'Each',
      price: 40000,
      costPrice: 35000,
      reorderLevel: 30,
      description: 'Ergonomic office chair with lumbar support',
      status: 'Active',
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    },
    {
      name: 'Laptop Computer',
      category: 'Electronics',
      unit: 'Each',
      price: 80000,
      costPrice: 70000,
      reorderLevel: 5,
      description: 'Business laptop with 8GB RAM',
      status: 'Active',
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    },
    {
      name: 'Printer Paper',
      category: 'Stationery',
      unit: 'Ream',
      price: 120000,
      costPrice: 105000,
      reorderLevel: 20,
      description: 'A4 size white paper',
      status: 'Active',
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    },
    {
      name: 'Desk Lamp',
      category: 'Electronics',
      unit: 'Each',
      price: 60000,
      costPrice: 50000,
      reorderLevel: 10,
      description: 'LED desk lamp with adjustable brightness',
      status: 'Active',
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    },
    {
      name: 'Scanner',
      category: 'Electronics',
      unit: 'Each',
      price: 75000,
      costPrice: 60000,
      reorderLevel: 8,
      description: 'High-speed document scanner',
      status: 'Active',
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    }
  ]);
  const [warehouses, setWarehouses] = useState([
    {
      name: "Main Warehouse",
      location: "123 Industrial Ave, Lagos",
      contactPerson: "John Doe",
    },
    {
      name: "North Warehouse",
      location: "456 North Rd, Abuja",
      contactPerson: "Jane Smith",
    },
    {
      name: "East Warehouse",
      location: "789 East St, Port Harcourt",
      contactPerson: "Chidi Okeke",
    },
  ]);
  const [suppliers, setSuppliers] = useState([
    {
      name: "Tech Supplies Ltd",
      contactPerson: "Alice Brown",
      email: "alice@techsupplies.com",
      phoneNumber: "+234 801 234 5678",
      address: "101 Tech Park, Lagos",
      taxId: "TIN123456",
      bankAccountNumber: "1234567890",
      status: "Active",
    },
    {
      name: "Office Essentials",
      contactPerson: "Bob Wilson",
      email: "bob@officeessentials.com",
      phoneNumber: "+234 802 345 6789",
      address: "202 Commerce Rd, Abuja",
      taxId: "TIN789012",
      bankAccountNumber: "0987654321",
      status: "Inactive",
    },
    {
      name: "Furniture Hub",
      contactPerson: "Clara James",
      email: "clara@furniturehub.com",
      phoneNumber: "+234 803 456 7890",
      address: "303 Industrial Zone, Kano",
      taxId: "TIN345678",
      bankAccountNumber: "1122334455",
      status: "Active",
    },
  ]);

  const transactions = [
    {
      id: "ST-001",
      product: "Office Chair",
      type: "Stock In",
      quantity: "+25",
      source: "From: Purchase Order PO-001",
      destination: "To: Main Warehouse",
      date: "05/08/2025, 10:30:00 AM",
      performedBy: "Taiwo Akinkunmi",
    },
    {
      id: "ST-002",
      product: "Laptop Computer",
      type: "Stock Out",
      quantity: "-10",
      source: "From: Main Warehouse",
      destination: "To: Sales Order SO-001",
      date: "05/08/2025, 14:21:00 PM",
      performedBy: "Mercy Johnson",
    },
    {
      id: "ST-003",
      product: "Printer Paper",
      type: "Stock In",
      quantity: "+30",
      source: "From: Purchase Order PO-002",
      destination: "To: Main Warehouse",
      date: "20/01/2025, 8:17:00 AM",
      performedBy: "Ifeoluwa Thomas",
    },
    {
      id: "ST-004",
      product: "Desk Lamp",
      type: "Stock In",
      quantity: "+40",
      source: "From: Purchase Order PO-003",
      destination: "To: Main Warehouse",
      date: "22/01/2025, 11:00:00 AM",
      performedBy: "Eze Chisom",
    },
    {
      id: "TR-001",
      product: "Scanner",
      type: "Transfer",
      quantity: "10",
      source: "From: Main Warehouse",
      destination: "To: North Warehouse",
      date: "05/08/2025, 09:00:00 AM",
      performedBy: "Chidi Okeke",
    },
    {
      id: "ADJ-001",
      product: "Printer Paper",
      type: "Adjustment",
      quantity: "-5",
      source: "From: Main Warehouse",
      destination: "To: Stock Correction",
      date: "05/08/2025, 11:30:00 AM",
      performedBy: "Jane Smith",
    }
  ];

  const getPageButtons = (total, current, setPage) =>
    Array.from({ length: total }, (_, i) => (
      <button
        key={i}
        className={`w-8 h-8 rounded ${
          current === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => setPage(i + 1)}
      >
        {i + 1}
      </button>
    ));

  const TRANSACTIONS_PER_PAGE = 2;
  const PRODUCTS_PER_PAGE = 5;
  const INVENTORY_PER_PAGE = 5;
  const WAREHOUSES_PER_PAGE = 5;
  const SUPPLIERS_PER_PAGE = 5;

  const totalTransactionPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  const totalProductPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const totalInventoryPages = Math.ceil(inventoryData.length / INVENTORY_PER_PAGE);
  const totalWarehousePages = Math.ceil(warehouses.length / WAREHOUSES_PER_PAGE);
  const totalSupplierPages = Math.ceil(suppliers.length / SUPPLIERS_PER_PAGE);

  const paginatedTransactions = transactions.slice(
    (transactionPage - 1) * TRANSACTIONS_PER_PAGE,
    transactionPage * TRANSACTIONS_PER_PAGE
  );

  const paginatedProducts = products.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE
  );

  const paginatedInventory = inventoryData.slice(
    (inventoryPage - 1) * INVENTORY_PER_PAGE,
    inventoryPage * INVENTORY_PER_PAGE
  );

  const paginatedWarehouses = warehouses.slice(
    (warehousePage - 1) * WAREHOUSES_PER_PAGE,
    warehousePage * WAREHOUSES_PER_PAGE
  );

  const paginatedSuppliers = suppliers.slice(
    (supplierPage - 1) * SUPPLIERS_PER_PAGE,
    supplierPage * SUPPLIERS_PER_PAGE
  );

  const belowReorderCount = inventoryData.filter(item => item.quantityOnHand < item.reorderLevel).length;

  // Filter transactions for modals
  const today = "05/08/2025";
  const stockInToday = transactions.filter(
    txn => txn.type === "Stock In" && txn.date.includes(today)
  );
  const stockOutToday = transactions.filter(
    txn => txn.type === "Stock Out" && txn.date.includes(today)
  );
  const transfers = transactions.filter(txn => txn.type === "Transfer");
  const adjustments = transactions.filter(txn => txn.type === "Adjustment");

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWarehouseFormChange = (e) => {
    const { name, value } = e.target;
    setWarehouseFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierFormChange = (e) => {
    const { name, value } = e.target;
    setSupplierFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventoryFormChange = (e) => {
    const { name, value } = e.target;
    setInventoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateProductForm = () => {
    const errors = {};
    if (!productFormData.name) errors.name = 'Name is required';
    if (!productFormData.category) errors.category = 'Category is required';
    if (!productFormData.unit) errors.unit = 'Unit is required';
    if (!productFormData.price || isNaN(productFormData.price) || productFormData.price <= 0)
      errors.price = 'Valid price is required';
    if (!productFormData.costPrice || isNaN(productFormData.costPrice) || productFormData.costPrice <= 0)
      errors.costPrice = 'Valid cost price is required';
    if (!productFormData.reorderLevel || isNaN(productFormData.reorderLevel) || productFormData.reorderLevel < 0)
      errors.reorderLevel = 'Valid reorder level is required';
    return errors;
  };

  const validateWarehouseForm = () => {
    const errors = {};
    if (!warehouseFormData.name) errors.name = 'Name is required';
    if (!warehouseFormData.location) errors.location = 'Location is required';
    if (!warehouseFormData.contactPerson) errors.contactPerson = 'Contact person is required';
    return errors;
  };

  const validateSupplierForm = () => {
    const errors = {};
    if (!supplierFormData.name) errors.name = 'Name is required';
    if (!supplierFormData.contactPerson) errors.contactPerson = 'Contact person is required';
    if (!supplierFormData.email || !/\S+@\S+\.\S+/.test(supplierFormData.email))
      errors.email = 'Valid email is required';
    if (!supplierFormData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!supplierFormData.address) errors.address = 'Address is required';
    if (!supplierFormData.taxId) errors.taxId = 'Tax ID is required';
    if (!supplierFormData.bankAccountNumber) errors.bankAccountNumber = 'Bank account number is required';
    return errors;
  };

  const validateInventoryForm = () => {
    const errors = {};
    if (!inventoryFormData.productName) errors.productName = 'Product is required';
    if (!inventoryFormData.warehouseName) errors.warehouseName = 'Warehouse is required';
    if (!inventoryFormData.quantityOnHand || isNaN(inventoryFormData.quantityOnHand) || parseInt(inventoryFormData.quantityOnHand) < 0)
      errors.quantityOnHand = 'Valid quantity is required';
    if (!inventoryFormData.lastUpdated) errors.lastUpdated = 'Last updated date is required';
    return errors;
  };

  const handleProductFormSubmit = () => {
    const errors = validateProductForm();
    if (Object.keys(errors).length > 0) {
      setProductFormErrors(errors);
      return;
    }
    const newProduct = {
      name: productFormData.name,
      category: productFormData.category,
      unit: productFormData.unit,
      price: productFormData.price.toString(),
      costPrice: productFormData.costPrice.toString(),
      reorderLevel: parseInt(productFormData.reorderLevel, 10),
      status: productFormData.status,
      description: productFormData.description,
    };
    const newInventoryItem = {
      name: productFormData.name,
      category: productFormData.category,
      unit: productFormData.unit,
      price: parseFloat(productFormData.price),
      costPrice: parseFloat(productFormData.costPrice),
      reorderLevel: parseInt(productFormData.reorderLevel, 10),
      status: productFormData.status,
      description: productFormData.description,
      warehouse: 'Main Warehouse',
      quantityOnHand: 0,
      lastUpdated: '2025-08-11',
    };
    setProducts((prev) => [...prev, newProduct]);
    setInventoryData((prev) => [...prev, newInventoryItem]);
    setProductFormData({
      name: '',
      category: '',
      unit: '',
      price: '',
      costPrice: '',
      taxRate: '',
      reorderLevel: '',
      status: 'Active',
      description: '',
    });
    setProductFormErrors({});
    setIsProductModalOpen(false);
  };

  const handleWarehouseFormSubmit = () => {
    const errors = validateWarehouseForm();
    if (Object.keys(errors).length > 0) {
      setWarehouseFormErrors(errors);
      return;
    }
    setWarehouses((prev) => [...prev, { ...warehouseFormData }]);
    setWarehouseFormData({
      name: '',
      location: '',
      contactPerson: '',
    });
    setWarehouseFormErrors({});
    setIsWarehouseModalOpen(false);
  };

  const handleSupplierFormSubmit = () => {
    const errors = validateSupplierForm();
    if (Object.keys(errors).length > 0) {
      setSupplierFormErrors(errors);
      return;
    }
    setSuppliers((prev) => [...prev, { ...supplierFormData }]);
    setSupplierFormData({
      name: '',
      contactPerson: '',
      email: '',
      phoneNumber: '',
      address: '',
      taxId: '',
      bankAccountNumber: '',
      status: 'Active',
    });
    setSupplierFormErrors({});
    setIsSupplierModalOpen(false);
  };

  const handleInventoryFormSubmit = () => {
    const errors = validateInventoryForm();
    if (Object.keys(errors).length > 0) {
      setInventoryFormErrors(errors);
      return;
    }
    const selectedProduct = products.find(p => p.name === inventoryFormData.productName);
    if (!selectedProduct) {
      // Handle error, perhaps set error
      return;
    }
    const newInventory = {
      name: selectedProduct.name,
      category: selectedProduct.category,
      unit: selectedProduct.unit,
      price: parseFloat(selectedProduct.price),
      costPrice: parseFloat(selectedProduct.costPrice),
      reorderLevel: selectedProduct.reorderLevel,
      status: selectedProduct.status,
      description: selectedProduct.description,
      warehouse: inventoryFormData.warehouseName,
      quantityOnHand: parseInt(inventoryFormData.quantityOnHand, 10),
      lastUpdated: inventoryFormData.lastUpdated,
    };
    setInventoryData((prev) => [...prev, newInventory]);
    setInventoryFormData({
      productName: '',
      warehouseName: '',
      quantityOnHand: '',
      lastUpdated: '2025-08-11',
    });
    setInventoryFormErrors({});
    setIsInventoryModalOpen(false);
  };

  const TransactionModal = ({ isOpen, onClose, title, transactions }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
        onClick={onClose}
      >
        <div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto relative overflow-auto max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions found for this category.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th scope="col" className="py-2 px-3">Transaction ID</th>
                    <th scope="col" className="py-2 px-3">Product</th>
                    <th scope="col" className="py-2 px-3">Type</th>
                    <th scope="col" className="py-2 px-3">Quantity</th>
                    <th scope="col" className="py-2 px-3">Source/Destination</th>
                    <th scope="col" className="py-2 px-3">Date</th>
                    <th scope="col" className="py-2 px-3">Performed by</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-3">{txn.id}</td>
                      <td className="py-2 px-3">{txn.product}</td>
                      <td
                        className={`py-2 px-3 font-medium ${
                          txn.type === "Stock In"
                            ? "text-green-600"
                            : txn.type === "Stock Out"
                            ? "text-red-600"
                            : txn.type === "Transfer"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {txn.type}
                      </td>
                      <td className="py-2 px-3">{txn.quantity}</td>
                      <td className="py-2 px-3">
                        <div>{txn.source}</div>
                        <div>{txn.destination}</div>
                      </td>
                      <td className="py-2 px-3">{txn.date}</td>
                      <td className="py-2 px-3">{txn.performedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 sm:p-4 bg-indigo-900">
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {["overview", "products", "inventory", "warehouse", "supplier"].map((tab) => (
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
            <Card
              title="Stock In Today"
              count="120"
              text="items received"
              action="View Details"
              icon={TrendingUp}
              iconColor="#16a34a"
              onActionClick={() => setIsStockInModalOpen(true)}
            />
            <Card
              title="Stock Out Today"
              count="580"
              text="items dispatched"
              action="View Details"
              icon={TrendingUp}
              iconColor="red"
              onActionClick={() => setIsStockOutModalOpen(true)}
            />
            <Card
              title="Transfers"
              count="25"
              text="warehouse transfers"
              action="Review Transfers"
              icon={FiRepeat}
              iconColor="#3b82f6"
              onActionClick={() => setIsTransfersModalOpen(true)}
            />
            <Card
              title="Adjustments"
              count="15"
              text="stock changes"
              action="Audit Adjustments"
              icon={FiSettings}
              iconColor="#f59e0b"
              onActionClick={() => setIsAdjustmentsModalOpen(true)}
            />
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th scope="col" className="py-2 px-3">Transaction ID</th>
                    <th scope="col" className="py-2 px-3">Product</th>
                    <th scope="col" className="py-2 px-3">Type</th>
                    <th scope="col" className="py-2 px-3">Quantity</th>
                    <th scope="col" className="py-2 px-3">Source/Destination</th>
                    <th scope="col" className="py-2 px-3">Date</th>
                    <th scope="col" className="py-2 px-3">Performed by</th>
                    <th scope="col" className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((txn, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-3">{txn.id}</td>
                      <td className="py-2 px-3">{txn.product}</td>
                      <td
                        className={`py-2 px-3 font-medium ${
                          txn.type === "Stock In"
                            ? "text-green-600"
                            : txn.type === "Stock Out"
                            ? "text-red-600"
                            : txn.type === "Transfer"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {txn.type}
                      </td>
                      <td className="py-2 px-3">{txn.quantity}</td>
                      <td className="py-2 px-3">
                        <div>{txn.source}</div>
                        <div>{txn.destination}</div>
                      </td>
                      <td className="py-2 px-3">{txn.date}</td>
                      <td className="py-2 px-3">{txn.performedBy}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FiEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setTransactionPage((p) => Math.max(p - 1, 1))}
                disabled={transactionPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {getPageButtons(totalTransactionPages, transactionPage, setTransactionPage)}
              <button
                onClick={() => setTransactionPage((p) => Math.min(p + 1, totalTransactionPages))}
                disabled={transactionPage === totalTransactionPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <TransactionModal
            isOpen={isStockInModalOpen}
            onClose={() => setIsStockInModalOpen(false)}
            title="Stock In Today"
            transactions={stockInToday}
          />
          <TransactionModal
            isOpen={isStockOutModalOpen}
            onClose={() => setIsStockOutModalOpen(false)}
            title="Stock Out Today"
            transactions={stockOutToday}
          />
          <TransactionModal
            isOpen={isTransfersModalOpen}
            onClose={() => setIsTransfersModalOpen(false)}
            title="Warehouse Transfers"
            transactions={transfers}
          />
          <TransactionModal
            isOpen={isAdjustmentsModalOpen}
            onClose={() => setIsAdjustmentsModalOpen(false)}
            title="Stock Adjustments"
            transactions={adjustments}
          />
        </>
      )}

      {activeTab === "products" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Product Catalog</h2>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsProductModalOpen(true)}
            >
              <FiPlus /> Add New Product
            </button>
          </div>
          <div className="overflow-auto bg-white border rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="p-3">Name</th>
                  <th scope="col" className="p-3">Category</th>
                  <th scope="col" className="p-3">Unit</th>
                  <th scope="col" className="p-3">Price</th>
                  <th scope="col" className="p-3">Cost Price</th>
                  <th scope="col" className="p-3">Tax Rate</th>
                  <th scope="col" className="p-3">Re-order Level</th>
                  <th scope="col" className="p-3">Status</th>
                  <th scope="col" className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-t">
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">{product.unit}</td>
                      <td className="p-3">₦{parseFloat(product.price).toLocaleString()}</td>
                      <td className="p-3">₦{parseFloat(product.costPrice).toLocaleString()}</td>
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
            {getPageButtons(totalProductPages, productPage, setProductPage)}
          </div>
          {isProductModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
              onClick={() => setIsProductModalOpen(false)}
            >
              <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-auto min-h-[400px] sm:min-h-[500px] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
                  onClick={() => setIsProductModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Add New Product</h3>
                <p className="text-xs sm:text-sm font-light mb-4 sm:mb-6">
                  Enter product information to create a new record
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <label className="block">
                    <span className="text-xs sm:text-sm">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={productFormData.name}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter product name"
                    />
                    {productFormErrors.name && <p className="text-red-500 text-xs">{productFormErrors.name}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Category</span>
                    <input
                      type="text"
                      name="category"
                      value={productFormData.category}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.category ? 'border-red-500' : ''}`}
                      placeholder="Enter category"
                    />
                    {productFormErrors.category && <p className="text-red-500 text-xs">{productFormErrors.category}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Unit</span>
                    <input
                      type="text"
                      name="unit"
                      value={productFormData.unit}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.unit ? 'border-red-500' : ''}`}
                      placeholder="Enter unit"
                    />
                    {productFormErrors.unit && <p className="text-red-500 text-xs">{productFormErrors.unit}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Price</span>
                    <input
                      type="number"
                      name="price"
                      value={productFormData.price}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.price ? 'border-red-500' : ''}`}
                      placeholder="Enter price"
                    />
                    {productFormErrors.price && <p className="text-red-500 text-xs">{productFormErrors.price}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Cost Price</span>
                    <input
                      type="number"
                      name="costPrice"
                      value={productFormData.costPrice}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.costPrice ? 'border-red-500' : ''}`}
                      placeholder="Enter cost price"
                    />
                    {productFormErrors.costPrice && <p className="text-red-500 text-xs">{productFormErrors.costPrice}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Reorder Level</span>
                    <input
                      type="number"
                      name="reorderLevel"
                      value={productFormData.reorderLevel}
                      onChange={handleProductFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${productFormErrors.reorderLevel ? 'border-red-500' : ''}`}
                      placeholder="Enter reorder level"
                    />
                    {productFormErrors.reorderLevel && <p className="text-red-500 text-xs">{productFormErrors.reorderLevel}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Description</span>
                    <textarea
                      name="description"
                      value={productFormData.description}
                      onChange={handleProductFormChange}
                      className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
                      placeholder="Enter description"
                    />
                  </label>
                </div>
                <div className="mt-4 pb-4 sm:pb-6">
                  <button
                    className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base font-medium"
                    onClick={handleProductFormSubmit}
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Inventory</h2>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsInventoryModalOpen(true)}
            >
              <FiPlus /> Add New Inventory
            </button>
          </div>
          {belowReorderCount > 0 && (
            <div className="mb-4 p-4 bg-red-500 text-yellow-800 rounded-md border border-yellow-300">
              ⚠️ Warning: {belowReorderCount} product{belowReorderCount > 1 ? 's are' : ' is'} below reorder level
            </div>
          )}
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Unit</th>
                <th scope="col" className="px-4 py-3">Price</th>
                <th scope="col" className="px-4 py-3">Cost Price</th>
                <th scope="col" className="px-4 py-3">Re-order level</th>
                <th scope="col" className="px-4 py-3">Warehouse</th>
                <th scope="col" className="px-4 py-3">Quantity on Hand</th>
                <th scope="col" className="px-4 py-3">Last Updated</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInventory.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.description}</div>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.unit}</td>
                  <td className="px-4 py-3">₦{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3">₦{item.costPrice.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.quantityOnHand < item.reorderLevel ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {item.reorderLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.warehouse}</td>
                  <td className="px-4 py-3">{item.quantityOnHand}</td>
                  <td className="px-4 py-3">{item.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-semibold text-sm">{item.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center gap-2 mt-4">
            {getPageButtons(totalInventoryPages, inventoryPage, setInventoryPage)}
          </div>
          {isInventoryModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
              onClick={() => setIsInventoryModalOpen(false)}
            >
              <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-auto min-h-[300px] sm:min-h-[400px] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
                  onClick={() => setIsInventoryModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Add New Inventory</h3>
                <p className="text-xs sm:text-sm font-light mb-4 sm:mb-6">
                  Enter inventory information to create a new record
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <label className="block">
                    <span className="text-xs sm:text-sm">Product</span>
                    <select
                      name="productName"
                      value={inventoryFormData.productName}
                      onChange={handleInventoryFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${inventoryFormErrors.productName ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Product</option>
                      {products.map((p, index) => (
                        <option key={index} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    {inventoryFormErrors.productName && <p className="text-red-500 text-xs">{inventoryFormErrors.productName}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Warehouse</span>
                    <select
                      name="warehouseName"
                      value={inventoryFormData.warehouseName}
                      onChange={handleInventoryFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${inventoryFormErrors.warehouseName ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map((w, index) => (
                        <option key={index} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                    {inventoryFormErrors.warehouseName && <p className="text-red-500 text-xs">{inventoryFormErrors.warehouseName}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Quantity at Hand</span>
                    <input
                      type="number"
                      name="quantityOnHand"
                      value={inventoryFormData.quantityOnHand}
                      onChange={handleInventoryFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${inventoryFormErrors.quantityOnHand ? 'border-red-500' : ''}`}
                      placeholder="Enter quantity"
                    />
                    {inventoryFormErrors.quantityOnHand && <p className="text-red-500 text-xs">{inventoryFormErrors.quantityOnHand}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Last Updated</span>
                    <input
                      type="date"
                      name="lastUpdated"
                      value={inventoryFormData.lastUpdated}
                      onChange={handleInventoryFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${inventoryFormErrors.lastUpdated ? 'border-red-500' : ''}`}
                    />
                    {inventoryFormErrors.lastUpdated && <p className="text-red-500 text-xs">{inventoryFormErrors.lastUpdated}</p>}
                  </label>
                </div>
                <div className="mt-4 pb-4 sm:pb-6">
                  <button
                    className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base font-medium"
                    onClick={handleInventoryFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "warehouse" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Warehouse Management</h2>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsWarehouseModalOpen(true)}
            >
              <FiPlus /> Add New Warehouse
            </button>
          </div>
          <div className="overflow-auto bg-white border rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="p-3">Name</th>
                  <th scope="col" className="p-3">Location</th>
                  <th scope="col" className="p-3">Contact Person</th>
                  <th scope="col" className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWarehouses.map((warehouse, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 font-medium">{warehouse.name}</td>
                    <td className="p-3">{warehouse.location}</td>
                    <td className="p-3">{warehouse.contactPerson}</td>
                    <td className="p-3 flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-2 mt-4">
            {getPageButtons(totalWarehousePages, warehousePage, setWarehousePage)}
          </div>
          {isWarehouseModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
              onClick={() => setIsWarehouseModalOpen(false)}
            >
              <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-auto min-h-[300px] sm:min-h-[400px] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
                  onClick={() => setIsWarehouseModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Add New Warehouse</h3>
                <p className="text-xs sm:text-sm font-light mb-4 sm:mb-6">
                  Enter warehouse information to create a new record
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <label className="block">
                    <span className="text-xs sm:text-sm">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={warehouseFormData.name}
                      onChange={handleWarehouseFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${warehouseFormErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter warehouse name"
                    />
                    {warehouseFormErrors.name && <p className="text-red-500 text-xs">{warehouseFormErrors.name}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Location</span>
                    <input
                      type="text"
                      name="location"
                      value={warehouseFormData.location}
                      onChange={handleWarehouseFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${warehouseFormErrors.location ? 'border-red-500' : ''}`}
                      placeholder="Enter location"
                    />
                    {warehouseFormErrors.location && <p className="text-red-500 text-xs">{warehouseFormErrors.location}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Contact Person</span>
                    <input
                      type="text"
                      name="contactPerson"
                      value={warehouseFormData.contactPerson}
                      onChange={handleWarehouseFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${warehouseFormErrors.contactPerson ? 'border-red-500' : ''}`}
                      placeholder="Enter contact person"
                    />
                    {warehouseFormErrors.contactPerson && <p className="text-red-500 text-xs">{warehouseFormErrors.contactPerson}</p>}
                  </label>
                </div>
                <div className="mt-4 pb-4 sm:pb-6">
                  <button
                    className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base font-medium"
                    onClick={handleWarehouseFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "supplier" && (
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Supplier Management</h2>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsSupplierModalOpen(true)}
            >
              <FiPlus /> Add New Supplier
            </button>
          </div>
          <div className="overflow-auto bg-white border rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="p-3">Name</th>
                  <th scope="col" className="p-3">Contact Person</th>
                  <th scope="col" className="p-3">Email</th>
                  <th scope="col" className="p-3">Phone Number</th>
                  <th scope="col" className="p-3">Address</th>
                  <th scope="col" className="p-3">Tax ID</th>
                  <th scope="col" className="p-3">Bank Account Number</th>
                  <th scope="col" className="p-3">Status</th>
                  <th scope="col" className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((supplier, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 font-medium">{supplier.name}</td>
                    <td className="p-3">{supplier.contactPerson}</td>
                    <td className="p-3">{supplier.email}</td>
                    <td className="p-3">{supplier.phoneNumber}</td>
                    <td className="p-3">{supplier.address}</td>
                    <td className="p-3">{supplier.taxId}</td>
                    <td className="p-3">{supplier.bankAccountNumber}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded ${supplier.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {supplier.status}
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-2 mt-4">
            {getPageButtons(totalSupplierPages, supplierPage, setSupplierPage)}
          </div>
          {isSupplierModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex pt-12 sm:pt-20 justify-center items-start sm:items-center px-2 sm:px-4"
              onClick={() => setIsSupplierModalOpen(false)}
            >
              <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-auto min-h-[500px] sm:min-h-[600px] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-lg sm:text-xl"
                  onClick={() => setIsSupplierModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Add New Supplier</h3>
                <p className="text-xs sm:text-sm font-light mb-4 sm:mb-6">
                  Enter supplier information to create a new record
                </p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <label className="block">
                    <span className="text-xs sm:text-sm">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={supplierFormData.name}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter supplier name"
                    />
                    {supplierFormErrors.name && <p className="text-red-500 text-xs">{supplierFormErrors.name}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Contact Person</span>
                    <input
                      type="text"
                      name="contactPerson"
                      value={supplierFormData.contactPerson}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.contactPerson ? 'border-red-500' : ''}`}
                      placeholder="Enter contact person"
                    />
                    {supplierFormErrors.contactPerson && <p className="text-red-500 text-xs">{supplierFormErrors.contactPerson}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={supplierFormData.email}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter email"
                    />
                    {supplierFormErrors.email && <p className="text-red-500 text-xs">{supplierFormErrors.email}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Phone Number</span>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={supplierFormData.phoneNumber}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.phoneNumber ? 'border-red-500' : ''}`}
                      placeholder="Enter phone number"
                    />
                    {supplierFormErrors.phoneNumber && <p className="text-red-500 text-xs">{supplierFormErrors.phoneNumber}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Address</span>
                    <textarea
                      name="address"
                      value={supplierFormData.address}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.address ? 'border-red-500' : ''}`}
                      placeholder="Enter address"
                    />
                    {supplierFormErrors.address && <p className="text-red-500 text-xs">{supplierFormErrors.address}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Tax ID</span>
                    <input
                      type="text"
                      name="taxId"
                      value={supplierFormData.taxId}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.taxId ? 'border-red-500' : ''}`}
                      placeholder="Enter tax ID"
                    />
                    {supplierFormErrors.taxId && <p className="text-red-500 text-xs">{supplierFormErrors.taxId}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Bank Account Number</span>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={supplierFormData.bankAccountNumber}
                      onChange={handleSupplierFormChange}
                      className={`border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base ${supplierFormErrors.bankAccountNumber ? 'border-red-500' : ''}`}
                      placeholder="Enter bank account number"
                    />
                    {supplierFormErrors.bankAccountNumber && <p className="text-red-500 text-xs">{supplierFormErrors.bankAccountNumber}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs sm:text-sm">Status</span>
                    <select
                      name="status"
                      value={supplierFormData.status}
                      onChange={handleSupplierFormChange}
                      className="border px-2 sm:px-3 py-1 sm:py-2 rounded w-full text-sm sm:text-base"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 pb-4 sm:pb-6">
                  <button
                    className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-700 w-full text-sm sm:text-base font-medium"
                    onClick={handleSupplierFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default EmployeeOverview;