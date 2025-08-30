// import React from "react";

// export default function EmployeeTable({ employees, onEdit, onDelete, onAdd }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mt-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Employee List</h2>
//         <button
//           onClick={onAdd}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Employee
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Gender</th>
//               <th className="border p-2">DOB</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">Job Title</th>
//               <th className="border p-2">Hire Date</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length === 0 ? (
//               <tr>
//                 <td colSpan="10" className="text-center p-4">
//                   No employees found
//                 </td>
//               </tr>
//             ) : (
//               employees.map((emp) => (
//                 <tr key={emp.id}>
//                   <td className="border p-2">
//                     {emp.firstName} {emp.lastName}
//                   </td>
//                   <td className="border p-2">{emp.gender}</td>
//                   <td className="border p-2">{emp.dob}</td>
//                   <td className="border p-2">{emp.email}</td>
//                   <td className="border p-2">{emp.phone}</td>
//                   <td className="border p-2">{emp.department}</td>
//                   <td className="border p-2">{emp.jobTitle}</td>
//                   <td className="border p-2">{emp.hireDate}</td>
//                   <td className="border p-2">{emp.employmentStatus}</td>
//                   <td className="border p-2 space-x-2">
//                     <button
//                       onClick={() => onEdit(emp)}
//                       className="bg-yellow-400 px-2 py-1 rounded text-white"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(emp.id)}
//                       className="bg-red-500 px-2 py-1 rounded text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function EmployeeTable() {
  // State with initial dummy data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dob: "1990-05-15",
      email: "john@example.com",
      phone: "123-456-7890",
      department: "HR",
      jobTitle: "HR Manager",
      hireDate: "2022-01-10",
      employmentStatus: "Active",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      dob: "1992-08-20",
      email: "jane@example.com",
      phone: "987-654-3210",
      department: "IT",
      jobTitle: "Frontend Developer",
      hireDate: "2023-03-15",
      employmentStatus: "Active",
    },
  ]);

  // Add new employee
  const handleAdd = () => {
    const newEmployee = {
      id: Date.now(),
      firstName: "New",
      lastName: "Employee",
      gender: "Male",
      dob: "1995-06-01",
      email: "new@example.com",
      phone: "555-123-4567",
      department: "Finance",
      jobTitle: "Accountant",
      hireDate: "2024-08-01",
      employmentStatus: "Active",
    };
    setEmployees([...employees, newEmployee]);
  };

  // Edit employee (modal can be added later)
  const handleEdit = (emp) => {
    alert(`Edit Employee: ${emp.firstName} ${emp.lastName}`);
  };

  // Delete employee
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Employee List</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">DOB</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Job Title</th>
                <th className="border p-2">Hire Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="border p-2">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="border p-2">{emp.gender}</td>
                    <td className="border p-2">{emp.dob}</td>
                    <td className="border p-2">{emp.email}</td>
                    <td className="border p-2">{emp.phone}</td>
                    <td className="border p-2">{emp.department}</td>
                    <td className="border p-2">{emp.jobTitle}</td>
                    <td className="border p-2">{emp.hireDate}</td>
                    <td className="border p-2">{emp.employmentStatus}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-yellow-400 px-2 py-1 rounded text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="bg-red-500 px-2 py-1 rounded text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
