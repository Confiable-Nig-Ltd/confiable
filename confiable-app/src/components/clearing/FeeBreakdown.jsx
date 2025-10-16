// import React from 'react';
// import { formatCurrencyDisplay } from '@/utils/currency';

// const FeeBreakdown = ({ formData, errors, onFieldChange, computeTotalFromForm }) => {
//   const feeFields = [
//     { key: "terminalFee", label: "Terminal Fee" },
//     { key: "shippingFee", label: "Shipping Fee" },
//     { key: "transport", label: "Transport" },
//     { key: "agency", label: "Agency" },
//     { key: "paar", label: "PAAR" },
//     { key: "duty", label: "Duty" },
//   ];

//   return (
//     <div className="bg-gray-100 rounded-md p-4 mb-4">
//       <h3 className="font-semibold mb-3">Fee Breakdown</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//         {feeFields.map((f) => (
//           <div key={f.key}>
//             <label className="text-sm text-gray-700">{f.label}</label>
//             <input
//               type="text"
//               className={`border p-2 rounded-md w-full ${errors[f.key] ? 'border-red-500' : ''}`}
//               placeholder="0"
//               value={formData[f.key]}
//               onChange={(e) => onFieldChange(f.key, e.target.value)}
//             />
//             {errors[f.key] && <p className="text-red-500 text-sm">{errors[f.key]}</p>}
//           </div>
//         ))}

//         <div className="md:col-span-3 mt-2">
//           <label className="font-bold">Total Fees</label>
//           <input
//             readOnly
//             value={formatCurrencyDisplay(computeTotalFromForm())}
//             className="border p-2 rounded-md w-full bg-gray-200 font-semibold"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeeBreakdown;

import React from "react";
import { formatCurrencyDisplay } from "@/utils/currency";

const FeeBreakdown = ({
  formData,
  errors,
  onFieldChange,
  computeTotalFromForm,
}) => {
  const feeFields = [
    { key: "terminalFee", label: "Terminal Fee" },
    { key: "shippingFee", label: "Shipping Fee" },
    { key: "transport", label: "Transport" },
    { key: "agency", label: "Agency" },
    { key: "paar", label: "PAAR" },
    { key: "duty", label: "Duty" },
  ];

  const total = typeof computeTotalFromForm === "function"
    ? computeTotalFromForm()
    : 0;

  return (
    <div className="bg-gray-100 rounded-md p-4 mb-4">
      <h3 className="font-semibold mb-3">Fee Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {feeFields.map((f) => (
          <div key={f.key}>
            <label className="text-sm text-gray-700">{f.label}</label>
            <input
              type="text"
              className={`border p-2 rounded-md w-full ${
                errors[f.key] ? "border-red-500" : ""
              }`}
              placeholder="0"
              value={formData[f.key]}
              onChange={(e) => onFieldChange(f.key, e.target.value)}
            />
            {errors[f.key] && (
              <p className="text-red-500 text-sm">{errors[f.key]}</p>
            )}
          </div>
        ))}

        <div className="md:col-span-3 mt-2">
          <label className="font-bold">Total Fees</label>
          <input
            readOnly
            value={formatCurrencyDisplay(total)}
            className="border p-2 rounded-md w-full bg-gray-200 font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default FeeBreakdown;
