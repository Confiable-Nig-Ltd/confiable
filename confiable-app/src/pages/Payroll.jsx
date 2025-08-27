// import React from 'react';
// import { Payroll } from '../data/payrollData';
// import PayrollTable from '../components/dashboard/payroll/PayrollTable';

// const PayrollPage = () => {
//   return (
//     <div className="p-4 sm:p-6 space-y-4">
//       {/* Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-md shadow space-y-4 md:space-y-0">
//         {/* Left Side - Filter & Sort */}
//         <div className="flex flex-wrap gap-2">
//           <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-.447.894l-4 2.5A1 1 0 019 21.5V14.414L3.293 6.707A1 1 0 013 6V4z" />
//             </svg>
//             Filter
//           </button>
//           <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M3 6h16M3 14h8m4 0h4M3 18h13" />
//             </svg>
//             Sort
//           </button>
//         </div>

//         {/* Right Side - Actions */}
//         <div className="flex flex-wrap gap-2">
//           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Generate Payslip
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             <svg
//               className="w-4 h-4 mr-2"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Add New Employee
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <PayrollTable data={Payroll} />
//     </div>
//   );
// };

// export default PayrollPage;





import React from 'react';
import { Payroll } from '../data/payrollData';
import PayrollTable from '../components/dashboard/payroll/PayrollTable';

const PayrollPage = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 bg-indigo-900">

      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-white p-4 rounded-md shadow">
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-.447.894l-4 2.5A1 1 0 019 21.5V14.414L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter
          </button>

          <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M3 6h16M3 14h8m4 0h4M3 18h13" />
            </svg>
            Sort
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Generate Payslip
          </button>

          <button className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New Employee
          </button>
        </div>
      </div>

      <PayrollTable data={Payroll} />
    </div>
  );
};

export default PayrollPage;
