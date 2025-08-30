import React, { useState, useEffect } from "react";

export default function EmployeeModal({ isOpen, onClose, onSave, departments, employee }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", gender: "Male", dob: "", email: "", phone: "",
    address: "", hireDate: "", jobTitle: "", department: "", employmentStatus: "",
    bankAccount: "", bankName: "", taxId: "", nationalId: ""
  });

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      firstName: "", lastName: "", gender: "Male", dob: "", email: "", phone: "",
      address: "", hireDate: "", jobTitle: "", department: "", employmentStatus: "",
      bankAccount: "", bankName: "", taxId: "", nationalId: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-lg font-bold mb-4">{employee ? "Edit Employee" : "Add Employee"}</h2>
        <div className="grid grid-cols-2 gap-2">
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded col-span-2">
            <option>Male</option>
            <option>Female</option>
          </select>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded col-span-2" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded col-span-2" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded col-span-2" />
          <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" className="border p-2 rounded col-span-2" />
          <select name="department" value={formData.department} onChange={handleChange} className="border p-2 rounded col-span-2">
            <option value="">Select Department</option>
            {departments.map((dept) => <option key={dept.id}>{dept.name}</option>)}
          </select>
          <input name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} placeholder="Employment Status" className="border p-2 rounded col-span-2" />
          <input name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Account Number" className="border p-2 rounded col-span-2" />
          <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="border p-2 rounded col-span-2" />
          <input name="taxId" value={formData.taxId} onChange={handleChange} placeholder="Tax ID" className="border p-2 rounded col-span-2" />
          <input name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="National ID" className="border p-2 rounded col-span-2" />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
