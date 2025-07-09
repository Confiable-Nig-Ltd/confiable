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

import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import EmployeeSuccess from "./EmployeeSuccess";
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

const initialEmployees = [
  {
    name: "Mbiatke Nkanta",
    phone: "09012222222",
    email: "mbiatke@example.com",
    department: "Marketing",
    joined: "2023-08-24",
    salary: "350000",
    status: "Active",
    role: "Marketing Manager",
  },
  {
    name: "Ada Chioma",
    phone: "08133344455",
    email: "ada@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
  {
    name: "Ada Ben",
    phone: "08133344455",
    email: "ada@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
  {
    name: "Tana Ofik",
    phone: "08133344455",
    email: "tana@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
  {
    name: "Biola Adeyemi",
    phone: "08133344455",
    email: "ada@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
  {
    name: "Confidence Bassey",
    phone: "08133344455",
    email: "confidence@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
  {
    name: "Seun Adebayo",
    phone: "08133344455",
    email: "seun@example.com",
    department: "Sales",
    joined: "2019-01-20",
    salary: "100000",
    status: "Inactive",
    role: "Sales Lead",
  },
];

export default function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    role: "",
    joined: "",
    salary: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees((prev) => [formData, ...prev]);
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      role: "",
      joined: "",
      salary: "",
      status: "Active",
    });
    setShowSuccess(true);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
  };

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const currentEmployees = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const departments = [
    {
      name: "Human Resources",
      employees: 67,
      location: "Lagos Office",
      lead: "Adebayo Johnson",
      role: "Manager",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
    {
      name: "Sales",
      employees: 42,
      location: "Abuja Office",
      lead: "Chioma Umeh",
      role: "Team Lead",
    },
  ];

 return (
  <div className="p-4">
    {/* Tab Navigation */}
    <section className="bg-white border rounded-lg mb-6 p-4">
      <p className="text-gray-500 text-sm mb-4">Search anything here...</p>
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
          <Card
            title="Total Employees"
            count="639"
            growth="↑ 35% from last month"
            growthColor="text-green-500"
            action="View Employees"
            icon={TrendingUp}
            iconColor="#16a34a"
          />
          <Card
            title="Number Of Departments"
            count="580"
            growth="↑ 12% this month"
            growthColor="text-green-500"
            action="View Departments"
            icon={TrendingUp}
            iconColor="#0ea5e9"
          />
          <Card
            title="New Employees"
            count="25"
            growth="↓ 8% from last month"
            growthColor="text-red-500"
            action="Review Applicants"
            icon={TrendingUp}
            iconColor="#dc2626"
          />
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
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add New Employee
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Joined</th>
                <th className="px-4 py-2 border">Salary</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{emp.name}</td>
                  <td className="px-4 py-2 border">{emp.phone}</td>
                  <td className="px-4 py-2 border">{emp.email}</td>
                  <td className="px-4 py-2 border">{emp.department}</td>
                  <td className="px-4 py-2 border">{emp.role}</td>
                  <td className="px-4 py-2 border">{emp.joined}</td>
                  <td className="px-4 py-2 border">₦{emp.salary}</td>
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
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        <FiEdit className="mr-1" /> Edit
                      </button>
                      <button className="flex items-center text-green-600 hover:text-green-800">
                        <FiPlus className="mr-1" /> Add
                      </button>
                      <button className="flex items-center text-red-600 hover:text-red-800">
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-1">
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    )}

    {/* Department Section */}
    {selectedTab === "department" && (
      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Departments</h2>
        <p className="mb-4">Manage organisation departments and their details.</p>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4 border">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {dept.name}
              </h3>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Employees:</span>{" "}
                {dept.employees}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Location:</span>{" "}
                {dept.location}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Lead:</span>{" "}
                {dept.lead}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {dept.role}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Add Employee Modal */}
    {isModalOpen && (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        onClick={handleCloseModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
          <h2 className="text-xl font-semibold mt-3">Add New Employee</h2>
          <p className="text-gray-500 mb-4 text-sm">
            {showSuccess
              ? "Employee added successfully"
              : "Enter employee information"}
          </p>

          {showSuccess ? (
            <>
              <EmployeeSuccess />
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleAddEmployee} className="space-y-4">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Role/ Job Title", name: "role", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Department", name: "department", type: "text" },
                { label: "Date of Employment", name: "joined", type: "date" },
                { label: "Salary (₦)", name: "salary", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-light text-black mb-1">
                    {label}
                  </label>
                  <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
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
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}
  </div>
 )}
