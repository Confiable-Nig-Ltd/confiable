// import React from "react";

// export default function Overview({ employees, departments }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-blue-100 p-4 rounded-lg text-center">
//         <h3 className="text-lg font-bold">Total Employees</h3>
//         <p className="text-2xl">{employees.length}</p>
//       </div>
//       <div className="bg-green-100 p-4 rounded-lg text-center">
//         <h3 className="text-lg font-bold">Departments</h3>
//         <p className="text-2xl">{departments.length}</p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Overview({ employees: initialEmployees, departments: initialDepartments }) {
  // Initialize with empty arrays so .length won't break
  const [employees, setEmployees] = useState(initialEmployees || []);
  const [departments, setDepartments] = useState(initialDepartments || []);

  // Optional: Sync state if parent sends new data later
  useEffect(() => {
    if (initialEmployees) setEmployees(initialEmployees);
  }, [initialEmployees]);

  useEffect(() => {
    if (initialDepartments) setDepartments(initialDepartments);
  }, [initialDepartments]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold">Total Employees</h3>
        <p className="text-2xl">{employees.length}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold">Departments</h3>
        <p className="text-2xl">{departments.length}</p>
      </div>
    </div>
  );
}
