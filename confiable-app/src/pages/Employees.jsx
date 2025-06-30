import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeSuccess from "./EmployeeSuccess";

const initialEmployees = [
  {
    name: "Mbiatke Nkanta",
    phone: "09012222222",
    email: "mbiatke@example.com",
    department: "Marketing",
    joined: "24/08/2023",
    salary: "350000",
    status: "Active",
  },
  {
    name: "Ada Chioma",
    phone: "08133344455",
    email: "ada@example.com",
    department: "Sales",
    joined: "20/01/2019",
    salary: "100000",
    status: "Inactive",
  },
  {
    name: "Tana Ofik",
    phone: "09076827284",
    email: "shehu@example.com",
    department: "Operations",
    joined: "10/06/2018",
    salary: "350000",
    status: "Active",
  },
  {
    name: "Wunmi Ade",
    phone: "09124867858",
    email: "wunmi@example.com",
    department: "Administration",
    joined: "12/09/2019",
    salary: "600000",
    status: "Active",
  },
  {
    name: "Tony Chima",
    phone: "08034567833",
    email: "tony@example.com",
    department: "Marketing",
    joined: "03/07/2013",
    salary: "200000",
    status: "Active",
  },
  {
    name: "Juliet Musa",
    phone: "07055663399",
    email: "juliet@example.com",
    department: "Finance",
    joined: "25/01/2016",
    salary: "70000",
    status: "Inactive",
  },
  {
    name: "Confidence Bassey",
    phone: "08123345545",
    email: "confidence@example.com",
    department: "Sales",
    joined: "30/05/2019",
    salary: "50000",
    status: "Active",
  },
  {
    name: "Blessing Ige",
    phone: "08123345545",
    email: "blessing@example.com",
    department: "Sales",
    joined: "30/05/2019",
    salary: "50000",
    status: "Active",
  },
  {
    name: "shehu seun",
    phone: "08123345545",
    email: "shehu@example.com",
    department: "Sales",
    joined: "30/05/2019",
    salary: "50000",
    status: "Active",
  },
  {
    name: "Debby Ige",
    phone: "08123345545",
    email: "debby@example.com",
    department: "Sales",
    joined: "30/05/2019",
    salary: "50000",
    status: "Active",
  },
];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    joined: "",
    salary: "",
    status: "Active",
  });

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const currentEmployees = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
      joined: "",
      salary: "",
      status: "Active",
    });
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  return (
    <>
      <section>
       <div className="p-4 bg-white border rounded-lg mb-6">
        <p className="text-gray-500 text-sm">Search anything here...</p>
       </div>

        <div className="p-4 bg-white border rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link href="/signup">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Employee Overview
              </button>
            </Link>
             <Link href="/employees">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Employee List
              </button>
            </Link>
             <Link href="/signup">
              <button className="px-6 py-2 rounded-xl text-sm hover:bg-blue-600 hover:text-white bg-gray-200">
                Department
              </button>
            </Link>
            
          </div>
       </div>
       

      </section>
      
      <section className="p-6 bg-white border rounded-lg">
        <div className="">
          {/* <EmployeeSuccess /> */}
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Employee List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white text-sm px-2 py-2 rounded-sm hover:bg-indigo-700"
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
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Date Joined</th>
                <th className="px-4 py-2 border">Monthly Salary</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{emp.name}</td>
                  <td className="px-4 py-2 border">{emp.phone}</td>
                  <td className="px-4 py-2 border">{emp.email}</td>
                  <td className="px-4 py-2 border">{emp.department}</td>
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

        {/* Modal */}
      {isModalOpen && (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white w-1/2 sm:w-1/2 max-w-lg p-6 rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold mt-4">Add New Employee</h3>
        <p className="text-sm text-gray-500 mb-5">
          Enter employee information to create a new record
        </p>

        <form onSubmit={handleAddEmployee} className="space-y-1">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Role/Job Title */}
          <div>
            <label className="block text-sm font-medium">Role / Job Title</label>
            <input
              type="text"
              name="role"
              placeholder="Enter job title"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="flex">
              
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-r"
              />
            </div>
          </div>

          {/* Date of Employment */}
          <div>
            <label className="block text-sm font-medium">Date of Employment</label>
            <input
              type="date"
              name="joined"
              value={formData.joined}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium">Salary</label>
            <div className="flex">
              <span className="px-3 py-2 border border-r-0 bg-gray-100 rounded-l">
                ₦
              </span>
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-r"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
      </div>
      </section>
    </>
  );
}