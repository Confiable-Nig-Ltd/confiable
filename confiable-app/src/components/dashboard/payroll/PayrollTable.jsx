// import React, { useState } from 'react';
// import { Employees } from '../../data/employeeData';
// import Pagination from '../general/Pagination';

// const PayrollTable = ({ data }) => {
//   const payrollData = Array.isArray(data) ? data : [];

//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(payrollData.length / itemsPerPage);
//   const paginatedData = payrollData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const getEmployee = (id) => {
//     return Employees.find(emp => emp.employee_id === id);
//   };

//   return (
//     <div className="overflow-x-auto bg-white rounded shadow p-4">
//       <table className="min-w-full table-auto text-sm sm:text-base">
//         <thead className="bg-gray-100 text-left">
//           <tr className="text-xs sm:text-sm text-gray-600">
//             <th className="px-2 py-2 sm:px-4">Employee</th>
//             <th className="px-2 py-2 sm:px-4">Role</th>
//             <th className="px-2 py-2 sm:px-4">Salary</th>
//             <th className="px-2 py-2 sm:px-4">Deductions</th>
//             <th className="px-2 py-2 sm:px-4">Net Pay</th>
//             <th className="px-2 py-2 sm:px-4">Payment Date</th>
//             <th className="px-2 py-2 sm:px-4">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
//                 No payroll data available.
//               </td>
//             </tr>
//           ) : (
//             paginatedData.map((item, index) => {
//               const employee = getEmployee(item.employee_id);
//               return (
//                 <tr key={index} className="border-t hover:bg-gray-50 text-xs sm:text-sm">
//                   <td className="px-2 py-2 sm:px-4">
//                     {employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4">
//                     {employee?.job_title ?? '—'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4">
//                     ${item.basic_salary?.toLocaleString() ?? '0.00'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4">
//                     ${item.deductions?.toLocaleString() ?? '0.00'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4 font-semibold">
//                     ${item.net_pay?.toLocaleString() ?? '0.00'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4">
//                     {item.payment_date ? new Date(item.payment_date).toLocaleDateString() : '—'}
//                   </td>
//                   <td className="px-2 py-2 sm:px-4">
//                     <span
//                       className={`inline-block px-2 py-1 text-xs rounded-full ${
//                         item.status === 'Paid'
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default PayrollTable;



import React, { useState } from 'react';
// import { Employees } from '../../data/employeeData';
import { Employees } from '../../../data/employeeData';
import Pagination from '../../general/Pagination';

const PayrollTable = ({ data }) => {
  const payrollData = Array.isArray(data) ? data : [];

  // Pagination setup
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const paginatedData = payrollData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper: Get Employee Info
  const getEmployee = (id) => {
    return Employees.find(emp => emp.employee_id === id);
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow p-4">
      <table className="min-w-full table-auto text-sm sm:text-base">
        <thead className="bg-gray-100 text-left">
          <tr className="text-xs sm:text-sm text-gray-600">
            <th className="px-2 py-2 sm:px-4">Employee</th>
            <th className="px-2 py-2 sm:px-4">Role</th>
            <th className="px-2 py-2 sm:px-4">Salary</th>
            <th className="px-2 py-2 sm:px-4">Deductions</th>
            <th className="px-2 py-2 sm:px-4">Net Pay</th>
            <th className="px-2 py-2 sm:px-4">Payment Date</th>
            <th className="px-2 py-2 sm:px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                No payroll data available.
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => {
              const employee = getEmployee(item.employee_id);
              return (
                <tr key={index} className="border-t hover:bg-gray-50 text-xs sm:text-sm">
                  <td className="px-2 py-2 sm:px-4">
                    {employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    {employee?.job_title ?? '—'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    ${item.basic_salary?.toLocaleString() ?? '0.00'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    ${item.deductions?.toLocaleString() ?? '0.00'}
                  </td>
                  <td className="px-2 py-2 sm:px-4 font-semibold">
                    ${item.net_pay?.toLocaleString() ?? '0.00'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    {item.payment_date ? new Date(item.payment_date).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-2 py-2 sm:px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PayrollTable;
