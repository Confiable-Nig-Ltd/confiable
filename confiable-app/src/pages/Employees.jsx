import React, { useState } from "react";

const initialEmployees = [
  {
    name: "Mbiatke Nkanta",
    phone: "09012222222",
    dob: "13/03/1996",
    role: "Marketing",
    joined: "24/08/2023",
    salary: "350,000",
    status: "Active",
  },
  {
    name: "Ada Chioma",
    phone: "08133344455",
    dob: "01/05/2000",
    role: "Sales",
    joined: "20/01/2019",
    salary: "100,000",
    status: "Inactive",
  },
  {
    name: "Tana Ofik",
    phone: "08133344455",
    dob: "01/05/2000",
    role: "Sales",
    joined: "20/01/2019",
    salary: "100,000",
    status: "Active",
  },
  // ...other employees (same as previous)
];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
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
    setEmployees((prev) => [...prev, formData]);
    setFormData({
      name: "",
      phone: "",
      dob: "",
      role: "",
      joined: "",
      salary: "",
      status: "Active",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Mobile Number</th>
              <th className="px-4 py-2 border">Date of Birth</th>
              <th className="px-4 py-2 border">Role/Department</th>
              <th className="px-4 py-2 border">Date Joined</th>
              <th className="px-4 py-2 border">Monthly Salary</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.phone}</td>
                <td className="px-4 py-2 border">{emp.dob}</td>
                <td className="px-4 py-2 border">{emp.role}</td>
                <td className="px-4 py-2 border">{emp.joined}</td>
                <td className="px-4 py-2 border">₦{emp.salary}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Employee</h3>
            <p className="text-sm text-gray-600 mb-2">Enter employee information to create a new record</p>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Role/Job Title</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="text"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Date Of Employment</label>
                  <input
                    type="date"
                    name="joined"
                    required
                    value={formData.joined}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
