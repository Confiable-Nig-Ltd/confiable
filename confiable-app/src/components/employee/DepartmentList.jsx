// import React from "react";

// export default function DepartmentList({ departments, onAdd }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mt-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Departments</h2>
//         <button onClick={onAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Department
//         </button>
//       </div>
//       <ul>
//         {departments.length === 0 ? (
//           <li className="text-gray-500">No departments found</li>
//         ) : (
//           departments.map((dept) => <li key={dept.id}>{dept.name}</li>)
//         )}
//       </ul>
//     </div>
//   );
// }

import React from "react";

export default function DepartmentList({ departments = [], onAdd }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Departments</h2>
        <button onClick={onAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Department
        </button>
      </div>
      <ul>
        {Array.isArray(departments) && departments.length === 0 ? (
          <li className="text-gray-500">No departments found</li>
        ) : (
          departments.map((dept) => <li key={dept.id}>{dept.name}</li>)
        )}
      </ul>
    </div>
  );
}