import React, { useState } from "react";
import Overview from "./Overview";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";
import DepartmentList from "./DepartmentList";
import DepartmentModal from "./DepartmentModal";
import EmployeeSuccess from "./EmployeeSuccess";

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = (employee) => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? employee : emp))
      );
    } else {
      setEmployees((prev) => [...prev, { ...employee, id: Date.now() }]);
    }
    setIsEmployeeModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        {["overview", "employees", "departments"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview"
              ? "Overview"
              : tab === "employees"
              ? "Employee List"
              : "Departments"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <Overview employees={employees} departments={departments} />
      )}
      {activeTab === "employees" && (
        <EmployeeTable
          employees={employees}
          onAdd={() => setIsEmployeeModalOpen(true)}
          onEdit={(emp) => setSelectedEmployee(emp)}
          onDelete={handleDeleteEmployee}
        />
      )}
      {activeTab === "departments" && (
        <DepartmentList
          departments={departments}
          onAdd={() => setIsDepartmentModalOpen(true)}
        />
      )}

      {/* Modals */}
      {(isEmployeeModalOpen || selectedEmployee) && (
        <EmployeeModal
          isOpen={isEmployeeModalOpen || selectedEmployee}
          onClose={() => {
            setIsEmployeeModalOpen(false);
            setSelectedEmployee(null);
          }}
          onSave={handleAddEmployee}
          departments={departments}
          employee={selectedEmployee}
        />
      )}

      {isDepartmentModalOpen && (
        <DepartmentModal
          isOpen={isDepartmentModalOpen}
          onClose={() => setIsDepartmentModalOpen(false)}
          onSave={(dept) =>
            setDepartments((prev) => [...prev, { ...dept, id: Date.now() }])
          }
        />
      )}

      <EmployeeSuccess />
    </div>
  );
}
