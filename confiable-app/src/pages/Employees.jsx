// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
// import EmployeeSuccess from "./EmployeeSuccess";

// const initialEmployees = [
//   {
//     name: "Mbiatke Nkanta",
//     phone: "09012222222",
//     email: "mbiatke@example.com",
//     department: "Marketing",
//     joined: "2023-08-24",
//     salary: "350000",
//     status: "Active",
//     role: "Marketing Manager",
//   },
//   {
//     name: "bassey confidence",
//     phone: "08133344455",
//     email: "bassey@example.com",
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
//     name: "Deborah Okeke",
//     phone: "08133344455",
//     email: "deborah@example.com",
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
//   {
//     name: "Biola Adeyemi",
//     phone: "08133344455",
//     email: "biola@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
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
//     name: "Ada Chioma",
//     phone: "08133344455",
//     email: "ada@example.com",
//     department: "Sales",
//     joined: "2019-01-20",
//     salary: "100000",
//     status: "Inactive",
//     role: "Sales Lead",
//   },
// ];

// export default function EmployeeTable() {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
  

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     department: "",
//     role: "",
//     joined: "",
//     salary: "",
//     status: "Active",
//   });

//   const totalPages = Math.ceil(employees.length / rowsPerPage);
//   const currentEmployees = employees.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = (e) => {
//     e.preventDefault();
//     setEmployees((prev) => [formData, ...prev]);
//     setFormData({
//       name: "",
//       phone: "",
//       email: "",
//       department: "",
//       role: "",
//       joined: "",
//       salary: "",
//       status: "Active",
//     });
//     setIsModalOpen(false);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       {/* Top Nav */}
//       <section className="p-4 bg-white border rounded-lg mb-6">
//         <p className="text-gray-500 text-sm mb-4">Search anything here...</p>
//         <div className="flex flex-wrap gap-3">
//           <Link to="/">
//             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
//               Employee Overview
//             </button>
//           </Link>
//           <Link to="/employees">
//             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
//               Employee List
//             </button>
//           </Link>
//           <Link to="/department">
//             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
//               Department
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* Employee Table */}
//       <section className="p-4 bg-white border rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Employee List</h2>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Add New Employee
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">Full Name</th>
//                 <th className="px-4 py-2 border">Phone</th>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Department</th>
//                 <th className="px-4 py-2 border">Role</th>
//                 <th className="px-4 py-2 border">Joined</th>
//                 <th className="px-4 py-2 border">Salary</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentEmployees.map((emp, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{emp.name}</td>
//                   <td className="px-4 py-2 border">{emp.phone}</td>
//                   <td className="px-4 py-2 border">{emp.email}</td>
//                   <td className="px-4 py-2 border">{emp.department}</td>
//                   <td className="px-4 py-2 border">{emp.role}</td>
//                   <td className="px-4 py-2 border">{emp.joined}</td>
//                   <td className="px-4 py-2 border">₦{emp.salary}</td>
//                   <td className="px-4 py-2 border">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         emp.status === "Active"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {emp.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <div className="flex flex-col space-y-1">
//                       <button
//                         onClick={() => console.log("Edit", emp.email)}
//                         className="flex items-center text-blue-600 hover:text-blue-800"
//                       >
//                         <FiEdit className="mr-1" /> Edit
//                       </button>
//                       <button
//                         onClick={() => console.log("Add", emp.email)}
//                         className="flex items-center text-green-600 hover:text-green-800"
//                       >
//                         <FiPlus className="mr-1" /> Add
//                       </button>
//                       <button
//                         onClick={() => console.log("Delete", emp.email)}
//                         className="flex items-center text-red-600 hover:text-red-800"
//                       >
//                         <FiTrash2 className="mr-1" /> Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-6 space-x-1">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 text-sm rounded border ${
//                 currentPage === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </section>

//       {/* Modal */}
//       {isModalOpen && (
//   <div
//     className="fixed inset-0 bg-black/30 pt-35 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6 overflow-y-auto"
//     onClick={() => setIsModalOpen(false)}
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg min-h-[90vh] sm:min-h-fit max-h-[70vh] sm:max-h-[80vh] overflow-y-auto"
//     >
//       {/* Close Icon */}
//       <button
//         onClick={() => setIsModalOpen(false)}
//         className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
//         aria-label="Close modal"
//       >
//         ×
//       </button>

//       {/* Modal Content */}
//       <h2 className="text-xl sm:text-2xl font-semibold mt-3">Add New Employee</h2>
//       <p className="text-gray-500 mb-4 text-sm sm:text-base">
//         Enter employee information to create a new record
//       </p>

//       <form onSubmit={handleAddEmployee} className="space-y-4">
//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Full Name</label>
//           <input
//             name="name"
//             type="text"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter full name"
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Role/ Job Title</label>
//           <input
//             name="role"
//             type="text"
//             value={formData.role}
//             onChange={handleChange}
//             placeholder="Enter role"
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Email</label>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Phone Number</label>
//           <input
//             name="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter phone number"
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Date of employment</label>
//           <input
//             name="joined"
//             type="date"
//             value={formData.joined}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm sm:text-base font-light text-black mb-1">Salary (₦)</label>
//           <input
//             name="salary"
//             type="number"
//             value={formData.salary}
//             onChange={handleChange}
//             placeholder="Enter salary"
//             required
//             className="w-full px-3 py-2 border rounded text-sm sm:text-base text-gray-400"
//           />
//         </div>

//         <div className="flex justify-center pt-4">
          
//           <button
//             type="submit"
//             className="bg-blue-600 w-full text-white px-2 sm:px-5 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//       <EmployeeSuccess />
//     </div>
//   </div>
// )}
//     </>
//   );
// }


// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
// // import EmployeeSuccess from "./EmployeeSuccess";

// // const initialEmployees = [
// //   {
// //     name: "Mbiatke Nkanta",
// //     phone: "09012222222",
// //     email: "mbiatke@example.com",
// //     department: "Marketing",
// //     joined: "2023-08-24",
// //     salary: "350000",
// //     status: "Active",
// //     role: "Marketing Manager",
// //   },
// //   // ... other employees ...
// // ];

// // export default function EmployeeTable() {
// //   const [employees, setEmployees] = useState(initialEmployees);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 5;

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     phone: "",
// //     email: "",
// //     department: "",
// //     role: "",
// //     joined: "",
// //     salary: "",
// //     status: "Active",
// //   });

// //   const totalPages = Math.ceil(employees.length / rowsPerPage);
// //   const currentEmployees = employees.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleAddEmployee = (e) => {
// //     e.preventDefault();
// //     setEmployees((prev) => [formData, ...prev]);
// //     setFormData({
// //       name: "",
// //       phone: "",
// //       email: "",
// //       department: "",
// //       role: "",
// //       joined: "",
// //       salary: "",
// //       status: "Active",
// //     });
// //     setShowSuccess(true);
// //     setCurrentPage(1);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setShowSuccess(false);
// //   };

// //   return (
// //     <>
// //       {/* Top Nav */}
// //       <section className="p-4 bg-white border rounded-lg mb-6">
// //         <p className="text-gray-500 text-sm mb-4">Search anything here...</p>
// //         <div className="flex flex-wrap gap-3">
// //           <Link to="/">
// //             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
// //               Employee Overview
// //             </button>
// //           </Link>
// //           <Link to="/employees">
// //             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
// //               Employee List
// //             </button>
// //           </Link>
// //           <Link to="/department">
// //             <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
// //               Department
// //             </button>
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Employee Table */}
// //       <section className="p-4 bg-white border rounded-lg">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-2xl font-bold">Employee List</h2>
// //           <button
// //             onClick={() => setIsModalOpen(true)}
// //             className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
// //           >
// //             Add New Employee
// //           </button>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full text-sm border">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="px-4 py-2 border">Full Name</th>
// //                 <th className="px-4 py-2 border">Phone</th>
// //                 <th className="px-4 py-2 border">Email</th>
// //                 <th className="px-4 py-2 border">Department</th>
// //                 <th className="px-4 py-2 border">Role</th>
// //                 <th className="px-4 py-2 border">Joined</th>
// //                 <th className="px-4 py-2 border">Salary</th>
// //                 <th className="px-4 py-2 border">Status</th>
// //                 <th className="px-4 py-2 border">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {currentEmployees.map((emp, index) => (
// //                 <tr key={index} className="hover:bg-gray-50">
// //                   <td className="px-4 py-2 border">{emp.name}</td>
// //                   <td className="px-4 py-2 border">{emp.phone}</td>
// //                   <td className="px-4 py-2 border">{emp.email}</td>
// //                   <td className="px-4 py-2 border">{emp.department}</td>
// //                   <td className="px-4 py-2 border">{emp.role}</td>
// //                   <td className="px-4 py-2 border">{emp.joined}</td>
// //                   <td className="px-4 py-2 border">₦{emp.salary}</td>
// //                   <td className="px-4 py-2 border">
// //                     <span
// //                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
// //                         emp.status === "Active"
// //                           ? "bg-blue-100 text-blue-700"
// //                           : "bg-red-100 text-red-700"
// //                       }`}
// //                     >
// //                       {emp.status}
// //                     </span>
// //                   </td>
// //                   <td className="px-4 py-2 border">
// //                     <div className="flex flex-col space-y-1">
// //                       <button
// //                         onClick={() => console.log("Edit", emp.email)}
// //                         className="flex items-center text-blue-600 hover:text-blue-800"
// //                       >
// //                         <FiEdit className="mr-1" /> Edit
// //                       </button>
// //                       <button
// //                         onClick={() => console.log("Add", emp.email)}
// //                         className="flex items-center text-green-600 hover:text-green-800"
// //                       >
// //                         <FiPlus className="mr-1" /> Add
// //                       </button>
// //                       <button
// //                         onClick={() => console.log("Delete", emp.email)}
// //                         className="flex items-center text-red-600 hover:text-red-800"
// //                       >
// //                         <FiTrash2 className="mr-1" /> Delete
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <div className="flex justify-center mt-6 space-x-1">
// //           <button
// //             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //             disabled={currentPage === 1}
// //             className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
// //           >
// //             Prev
// //           </button>
// //           {Array.from({ length: totalPages }, (_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => setCurrentPage(i + 1)}
// //               className={`px-3 py-1 text-sm rounded border ${
// //                 currentPage === i + 1
// //                   ? "bg-blue-600 text-white"
// //                   : "hover:bg-gray-100"
// //               }`}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}
// //           <button
// //             onClick={() =>
// //               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
// //             }
// //             disabled={currentPage === totalPages}
// //             className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </section>

// //       {/* Modal */}
// //       {isModalOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/30 pt-20 sm:pt-32 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6 overflow-y-auto"
// //           onClick={handleCloseModal}
// //         >
// //           <div
// //             onClick={(e) => e.stopPropagation()}
// //             className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
// //           >
// //             <button
// //               onClick={handleCloseModal}
// //               className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
// //               aria-label="Close modal"
// //             >
// //               ×
// //             </button>

// //             <h2 className="text-xl sm:text-2xl font-semibold mt-3">Add New Employee</h2>
// //             <p className="text-gray-500 mb-4 text-sm sm:text-base">
// //               {showSuccess
// //                 ? "Employee added successfully"
// //                 : "Enter employee information to create a new record"}
// //             </p>

// //             {showSuccess ? (
// //               <>
// //                 <EmployeeSuccess />
// //                 {/* <div className="flex justify-center pt-6">
// //                   <button
// //                     onClick={handleCloseModal}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //                   >
// //                     Done
// //                   </button>
// //                 </div> */}
// //               </>
// //             ) : (
// //               <form onSubmit={handleAddEmployee} className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Full Name</label>
// //                   <input
// //                     name="name"
// //                     type="text"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     placeholder="Enter full name"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Role/ Job Title</label>
// //                   <input
// //                     name="role"
// //                     type="text"
// //                     value={formData.role}
// //                     onChange={handleChange}
// //                     placeholder="Enter role"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Email</label>
// //                   <input
// //                     name="email"
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     placeholder="Enter email"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Phone Number</label>
// //                   <input
// //                     name="phone"
// //                     type="tel"
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     placeholder="Enter phone number"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Department</label>
// //                   <input
// //                     name="department"
// //                     type="text"
// //                     value={formData.department}
// //                     onChange={handleChange}
// //                     placeholder="Enter department"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Date of employment</label>
// //                   <input
// //                     name="joined"
// //                     type="date"
// //                     value={formData.joined}
// //                     onChange={handleChange}
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-light text-black mb-1">Salary (₦)</label>
// //                   <input
// //                     name="salary"
// //                     type="number"
// //                     value={formData.salary}
// //                     onChange={handleChange}
// //                     placeholder="Enter salary"
// //                     required
// //                     className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
// //                   />
// //                 </div>

// //                 <div className="flex justify-center pt-4">
// //                   <button
// //                     type="submit"
// //                     className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
// //                   >
// //                     Save
// //                   </button>
// //                 </div>
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

import React, { useState, useMemo } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { TrendingUp } from 'lucide-react';

const Card = ({ title, count, growth, growthColor, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10`} style={{ backgroundColor: `${iconColor}20` }}>
        {Icon && <Icon className="text-xl" color={iconColor} />}
      </div>
    </div>
    <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
    <button className="text-blue-600 text-sm font-semibold hover:underline">
      {action}
    </button>
  </div>
);

const EmployeeSuccess = ({ employee, onClose }) => (
  <div className="space-y-4">
    <h2 className="text-black font-bold text-md">Employee {employee.id ? "Updated" : "Added"} Successfully</h2>
    <p className="text-gray-500 font-light text-sm mb-4">
      The employee record has been {employee.id ? "updated" : "created"} successfully. Below are the details:
    </p>
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-2 text-sm">
        <div><span className="font-medium text-gray-700">Full Name:</span> {employee.name}</div>
        <div><span className="font-medium text-gray-700">Role:</span> {employee.role}</div>
        <div><span className="font-medium text-gray-700">Email:</span> {employee.email}</div>
        <div><span className="font-medium text-gray-700">Phone:</span> {employee.phone}</div>
        <div><span className="font-medium text-gray-700">Department:</span> {employee.department}</div>
        <div><span className="font-medium text-gray-700">Joined:</span> {employee.joined}</div>
        <div><span className="font-medium text-gray-700">Salary:</span> ₦{new Intl.NumberFormat("en-NG").format(employee.salary)}</div>
        <div><span className="font-medium text-gray-700">Status:</span> {employee.status}</div>
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <button
        onClick={onClose}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Done
      </button>
    </div>
  </div>
);

const DepartmentDetails = ({ department, onClose }) => (
  <div className="space-y-4">
    <h2 className="text-black font-bold text-md">Department Details</h2>
    <p className="text-gray-500 font-light text-sm mb-4">
      Details for {department.name} department
    </p>
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-2 text-sm">
        <div><span className="font-medium text-gray-700">Department Name:</span> {department.name}</div>
        <div><span className="font-medium text-gray-700">Location:</span> {department.location}</div>
        <div><span className="font-medium text-gray-700">Manager:</span> {department.manager.name}</div>
        <div>
          <span className="font-medium text-gray-700">Manager Picture:</span>
          <div className="mt-2">
            <img
              src={department.manager.picture}
              alt={`${department.manager.name}'s profile`}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <button
        onClick={onClose}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

const initialEmployees = [
  {
    id: 1,
    name: "Mbiatke Nkanta",
    phone: "09012222222",
    email: "mbiatke@example.com",
    department: "Marketing",
    joined: "2023-08-24",
    salary: "350000",
    status: "Active",
    role: "Marketing Manager",
    picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80",
  },
  {
    id: 2,
    name: "Ada Chioma",
    phone: "08133344455",
    email: "ada@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
    picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80",
  },
];

const initialDepartments = [
  {
    id: 1,
    name: "Human Resources",
    location: "Lagos Office",
    manager: initialEmployees[0], // Mbiatke Nkanta
  },
  {
    id: 2,
    name: "Sales",
    location: "Abuja Office",
    manager: initialEmployees[1], // Ada Chioma
  },
];

export default function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [employees, setEmployees] = useState(initialEmployees);
  const [departments, setDepartments] = useState(initialDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDepartmentDetailsOpen, setIsDepartmentDetailsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [lastSavedEmployee, setLastSavedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    role: "",
    joined: "",
    salary: "",
    status: "Active",
    picture: "",
  });
  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    location: "",
    manager: "",
  });
  const rowsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setDepartmentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const validateEmployeeForm = () => {
    const errors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!/^\d{10,}$/.test(formData.phone)) {
      errors.phone = "Phone number must be at least 10 digits";
    }
    if (formData.salary < 0) {
      errors.salary = "Salary cannot be negative";
    }
    return errors;
  };

  const validateDepartmentForm = () => {
    const errors = {};
    if (!departmentFormData.name) {
      errors.name = "Department name is required";
    }
    return errors;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const errors = validateEmployeeForm();
    if (Object.keys(errors).length > 0) {
      alert(JSON.stringify(errors, null, 2));
      return;
    }
    let updatedEmployee;
    if (editingEmployee) {
      updatedEmployee = { ...formData, id: editingEmployee.id };
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? updatedEmployee : emp
        )
      );
    } else {
      updatedEmployee = {
        ...formData,
        id: employees.length + 1,
        picture: formData.picture || "https://images.unsplash.com/photo-1511367461989-2de3b3d00000?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80",
      };
      setEmployees((prev) => [updatedEmployee, ...prev]);
    }
    setLastSavedEmployee(updatedEmployee);
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      role: "",
      joined: "",
      salary: "",
      status: "Active",
      picture: "",
    });
    setEditingEmployee(null);
    setShowSuccess(true);
    setCurrentPage(1);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    const errors = validateDepartmentForm();
    if (Object.keys(errors).length > 0) {
      alert(JSON.stringify(errors, null, 2));
      return;
    }
    const selectedEmployee = employees.find((emp) => emp.name === departmentFormData.manager);
    if (!selectedEmployee) {
      alert("Please select a valid manager.");
      return;
    }
    setDepartments((prev) => [
      {
        ...departmentFormData,
        id: prev.length + 1,
        manager: selectedEmployee,
      },
      ...prev,
    ]);
    setDepartmentFormData({
      name: "",
      location: "",
      manager: "",
    });
    setIsDepartmentModalOpen(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleCloseModal = () => {
    if (
      Object.values(formData).some((value) => value !== "") &&
      !window.confirm("You have unsaved changes. Are you sure you want to close?")
    ) {
      return;
    }
    setIsModalOpen(false);
    setShowSuccess(false);
    setEditingEmployee(null);
    setLastSavedEmployee(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      role: "",
      joined: "",
      salary: "",
      status: "Active",
      picture: "",
    });
  };

  const handleCloseDepartmentModal = () => {
    if (
      Object.values(departmentFormData).some((value) => value !== "") &&
      !window.confirm("You have unsaved changes. Are you sure you want to close?")
    ) {
      return;
    }
    setIsDepartmentModalOpen(false);
    setDepartmentFormData({
      name: "",
      location: "",
      manager: "",
    });
  };

  const handleViewDepartmentDetails = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentDetailsOpen(true);
  };

  const handleCloseDepartmentDetailsModal = () => {
    setIsDepartmentDetailsOpen(false);
    setSelectedDepartment(null);
  };

  const filteredEmployees = useMemo(
    () =>
      employees.filter((emp) =>
        [emp.name, emp.email, emp.department]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [employees, searchQuery]
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const currentEmployees = useMemo(
    () =>
      filteredEmployees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [filteredEmployees, currentPage, rowsPerPage]
  );

  const overviewCards = useMemo(() => {
    const totalEmployees = employees.length;
    const departmentsCount = departments.length;
    const newEmployees = employees.filter(
      (emp) => new Date(emp.joined) > new Date(new Date().setMonth(new Date().getMonth() - 1))
    ).length;

    return [
      {
        title: "Total Employees",
        count: totalEmployees,
        growth: totalEmployees > 0 ? `↑ ${Math.round((totalEmployees / (totalEmployees + 10)) * 100)}% from last month` : "No change",
        growthColor: totalEmployees > 0 ? "text-green-500" : "text-gray-500",
        action: "View Employees",
        icon: TrendingUp,
        iconColor: "#16a34a",
      },
      {
        title: "Number Of Departments",
        count: departmentsCount,
        growth: departmentsCount > 0 ? `↑ ${Math.round((departmentsCount / (departmentsCount + 2)) * 100)}% this month` : "No change",
        growthColor: departmentsCount > 0 ? "text-green-500" : "text-gray-500",
        action: "View Departments",
        icon: TrendingUp,
        iconColor: "#0ea5e9",
      },
      {
        title: "New Employees",
        count: newEmployees,
        growth: newEmployees > 0 ? `↑ ${Math.round((newEmployees / (newEmployees + 5)) * 100)}% from last month` : "No change",
        growthColor: newEmployees > 0 ? "text-green-500" : "text-gray-500",
        action: "Review Applicants",
        icon: TrendingUp,
        iconColor: "#dc2626",
      },
    ];
  }, [employees, departments]);

  return (
    <div className="p-4 bg-indigo-900">
      {/* Tab Navigation */}
      <section className="bg-white border rounded-lg mb-6 p-4">
        <label htmlFor="search" className="sr-only">Search employees</label>
        <input
          id="search"
          type="text"
          placeholder="Search by name, email, or department..."
          className="w-full mb-4 p-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
          value={searchQuery}
          onChange={handleSearch}
          aria-describedby="search-description"
        />
        <span id="search-description" className="sr-only">
          Search employees by name, email, or department
        </span>
        <div className="flex flex-wrap gap-3">
          {["overview", "list", "department"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm capitalize ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
              aria-pressed={selectedTab === tab}
            >
              {tab === "overview"
                ? "Employee Overview"
                : tab === "list"
                ? "Employee List"
                : "Department"}
            </button>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      {selectedTab === "overview" && (
        <section className="bg-white border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Employee Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {overviewCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </section>
      )}

      {/* Employee List Section */}
      {selectedTab === "list" && (
        <section className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee List</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
              aria-label="Add new employee"
            >
                <FiPlus /> Add New Employee
            </button>
          </div>

          {/* Mobile-responsive Employee List */}
          <div className="overflow-x-auto">
            {currentEmployees.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No employees found.</p>
            ) : (
              <>
                {/* Table for larger screens */}
                <table className="min-w-full text-sm border hidden sm:table" aria-label="Employee list">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "Full Name",
                        "Phone",
                        "Email",
                        "Department",
                        "Role",
                        "Joined",
                        "Salary",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th key={header} className="px-4 py-2 border text-left" scope="col">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{emp.name}</td>
                        <td className="px-4 py-2 border">{emp.phone}</td>
                        <td className="px-4 py-2 border">{emp.email}</td>
                        <td className="px-4 py-2 border">{emp.department}</td>
                        <td className="px-4 py-2 border">{emp.role}</td>
                        <td className="px-4 py-2 border">{emp.joined}</td>
                        <td className="px-4 py-2 border">₦{new Intl.NumberFormat("en-NG").format(emp.salary)}</td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              emp.status === "Active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => handleEditEmployee(emp)}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                              aria-label={`Edit ${emp.name}`}
                            >
                              <FiEdit className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp.id)}
                              className="flex items-center text-red-600 hover:text-red-800"
                              aria-label={`Delete ${emp.name}`}
                            >
                              <FiTrash2 className="mr-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Card layout for mobile screens */}
                <div className="sm:hidden space-y-4">
                  {currentEmployees.map((emp) => (
                    <div key={emp.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Full Name:</span>{" "}
                          {emp.name}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>{" "}
                          {emp.phone}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>{" "}
                          {emp.email}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Department:</span>{" "}
                          {emp.department}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Role:</span>{" "}
                          {emp.role}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Joined:</span>{" "}
                          {emp.joined}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Salary:</span>{" "}
                          ₦{new Intl.NumberFormat("en-NG").format(emp.salary)}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              emp.status === "Active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => handleEditEmployee(emp)}
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            aria-label={`Edit ${emp.name}`}
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="flex items-center text-red-600 hover:text-red-800 text-sm"
                            aria-label={`Delete ${emp.name}`}
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination */}
          {filteredEmployees.length > 0 && (
            <div className="flex flex-wrap justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, filteredEmployees.length)} of{" "}
                {filteredEmployees.length} employees
              </p>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
                  aria-label="Previous page"
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
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Department Section */}
      {selectedTab === "department" && (
        <section className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Departments</h2>
            <button
              onClick={() => setIsDepartmentModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
              aria-label="Add new department"
            >
             <FiPlus /> Add New Department
            </button>
          </div>
          <p className="mb-4">Manage organisation departments and their details.</p>
          {departments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No departments found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-white shadow rounded-lg p-4 border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dept.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Location:</span>{" "}
                    {dept.location}
                  </div>
                  <div className="text-sm text-gray-600 mb-4 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Manager:</span>
                    <img
                      src={dept.manager.picture}
                      alt={`${dept.manager.name}'s profile`}
                      className="h-12 w-12 rounded-full object-cover mr-2"
                    />
                    {dept.manager.name}
                  </div>
                  <button
                    onClick={() => handleViewDepartmentDetails(dept)}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
                    aria-label={`View details for ${dept.name}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Add/Edit Employee Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            {showSuccess ? (
              <EmployeeSuccess employee={lastSavedEmployee} onClose={handleCloseModal} />
            ) : (
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <h2 className="text-black font-bold text-md">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <p className="text-gray-500 font-light text-sm mb-8">
                  {editingEmployee
                    ? "Update employee information"
                    : "Enter employee information to create a new record"}
                </p>
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Role/ Job Title", name: "role", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone", type: "tel" },
                  { label: "Department", name: "department", type: "text" },
                  { label: "Date of Employment", name: "joined", type: "date" },
                  { label: "Salary (₦)", name: "salary", type: "number" },
                  { label: "Picture URL", name: "picture", type: "url" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-light text-black mb-1">
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      required={name !== "picture"}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                ))}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    {editingEmployee ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {isDepartmentModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseDepartmentModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseDepartmentModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <h2 className="text-black font-bold text-md">Add New Department</h2>
              <p className="text-gray-500 font-light text-sm mb-8">
                Enter department information to create a new record
              </p>
              <div>
                <label htmlFor="name" className="block text-sm font-light text-black mb-1">
                  Department Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={departmentFormData.name}
                  onChange={handleDepartmentChange}
                  required
                  placeholder="Enter department name"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-light text-black mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={departmentFormData.location}
                  onChange={handleDepartmentChange}
                  required
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="manager" className="block text-sm font-light text-black mb-1">
                  Manager
                </label>
                <select
                  id="manager"
                  name="manager"
                  value={departmentFormData.manager}
                  onChange={handleDepartmentChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                >
                  <option value="" disabled>Select Manager</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Department Details Modal */}
      {isDepartmentDetailsOpen && selectedDepartment && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseDepartmentDetailsModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseDepartmentDetailsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <DepartmentDetails
              department={selectedDepartment}
              onClose={handleCloseDepartmentDetailsModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}