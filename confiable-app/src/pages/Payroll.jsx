// import React, {useState} from 'react';
// import { Payroll } from '../data/payrollData';
// import PayrollTable from '../components/dashboard/payroll/PayrollTable';
// import PayslipGenerator from '../components/general/PayslipGenerator'; 

// const PayrollPage = () => {

// const [showModal, setShowModal] = useState(false);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   return (
//     <div className="p-4 sm:p-6 space-y-4 min-h-screen">

//       {/* Action Buttons */}
//       <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-white p-4 rounded-md shadow">

//         {/* Left-side Buttons */}
//         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//           <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-.447.894l-4 2.5A1 1 0 019 21.5V14.414L3.293 6.707A1 1 0 013 6V4z" />
//             </svg>
//             Filter
//           </button>

//           <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M3 6h16M3 14h8m4 0h4M3 18h13" />
//             </svg>
//             Sort
//           </button>
//         </div>

//         {/* Right-side Buttons */}
//         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//           <button
//             onClick={openModal}
//             className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Generate Payslip
//           </button>

//           <button className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto">
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Add New Employee
//           </button>
//         </div>
//       </div>

//       {/* Payroll Table */}
//       <PayrollTable data={Payroll} />

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <PayslipGenerator />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PayrollPage;



import React, { useState } from 'react';
import { Payroll } from '../data/payrollData';
import PayrollTable from '../components/dashboard/payroll/PayrollTable';
import PayslipGenerator from '../components/general/PayslipGenerator';
import AddEmployee from '../components/forms/AddEmployeeForm'; 

const PayrollPage = () => {
  const [modalType, setModalType] = useState(null); 

  const openModal = (type) => setModalType(type); 
  const closeModal = () => setModalType(null);

  return (
    <div className="p-4 sm:p-6 space-y-4 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-white p-4 rounded-md shadow">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-.447.894l-4 2.5A1 1 0 019 21.5V14.414L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter
          </button>

          <button className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700 w-full sm:w-auto">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M3 6h16M3 14h8m4 0h4M3 18h13" />
            </svg>
            Sort
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button
            onClick={() => openModal('payslip')}
            className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Generate Payslip
          </button>

          <button
            onClick={() => openModal('employee')}
            className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New Employee
          </button>
        </div>
      </div>

      <PayrollTable data={Payroll} />

      {/* Shared Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Conditional modal content */}
            {modalType === 'payslip' && <PayslipGenerator />}
            {modalType === 'employee' && <AddEmployee onClose={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollPage;
