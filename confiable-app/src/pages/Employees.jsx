import React, { useState, useMemo } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Card = ({
  title,
  count,
  growth,
  growthColor,
  action,
  icon: Icon,
  iconColor,
}) => (
  <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        {Icon && <Icon className="text-xl" color={iconColor} />}
      </div>
    </div>
    <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
    <button className="text-blue-600 text-sm font-semibold hover:underline">
      {action}
    </button>
  </div>
);

const EmployeeDetails = ({ employee, onClose }) => (
  <div className="space-y-4">
    <h2 className="text-black font-bold text-md">Employee Details</h2>
    <p className="text-gray-500 font-light text-sm mb-4">
      Details for {employee.first_name} {employee.last_name}
    </p>
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-2 text-sm">
        <div><span className="font-medium text-gray-700">First Name:</span> {employee.first_name}</div>
        <div><span className="font-medium text-gray-700">Last Name:</span> {employee.last_name}</div>
        <div><span className="font-medium text-gray-700">Gender:</span> {employee.gender}</div>
        <div><span className="font-medium text-gray-700">Date of Birth:</span> {employee.date_of_birth}</div>
        <div><span className="font-medium text-gray-700">Email:</span> {employee.email}</div>
        <div><span className="font-medium text-gray-700">Phone:</span> {employee.phone_number}</div>
        <div><span className="font-medium text-gray-700">Address:</span> {employee.address}</div>
        <div><span className="font-medium text-gray-700">Hire Date:</span> {employee.hire_date}</div>
        <div><span className="font-medium text-gray-700">Job Title:</span> {employee.job_title}</div>
        <div><span className="font-medium text-gray-700">Department:</span> {employee.department_id}</div>
        <div><span className="font-medium text-gray-700">Employment Status:</span> {employee.employment_status}</div>
        <div><span className="font-medium text-gray-700">Bank Account Number:</span> {employee.bank_account_number}</div>
        <div><span className="font-medium text-gray-700">Bank Name:</span> {employee.bank_name}</div>
        <div><span className="font-medium text-gray-700">Tax ID:</span> {employee.tax_id}</div>
        <div><span className="font-medium text-gray-700">National ID:</span> {employee.national_id}</div>
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <button
        onClick={onClose}
        className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

const DepartmentDetails = ({ department, onClose }) => (
  <div className="space-y-4">
    <h2 className="text-black font-bold text-md">Department Details</h2>
    <p className="text-gray-500 font-light text-sm mb-4">
      Details for {department.id} department
    </p>
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-2 text-sm">
        <div><span className="font-medium text-gray-700">Department Name:</span> {department.name}</div>
        <div><span className="font-medium text-gray-700">Location:</span> {department.location}</div>
        <div><span className="font-medium text-gray-700">Manager:</span> {department.manager ? `${department.manager.first_name} ${department.manager.last_name}` : 'No manager assigned'}</div>
        <div>
          <span className="font-medium text-gray-700">Manager Picture:</span>
          <div className="mt-2">
            <img
              src={department.manager?.picture || "/default-avatar.png"}
              alt={`${department.manager?.first_name || "Unknown"} ${department.manager?.last_name || ""}'s profile`}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center pt-4">
      <button
        onClick={onClose}
        className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

const RecruitmentDismissalBarChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Monthly Recruitment and Dismissal Trend</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No data available for the selected year.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} aria-label="Bar chart showing monthly recruitment and dismissal trends">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Bar dataKey="Recruitment" fill="#4CAF50" barSize={20} name="Recruitments" />
            <Bar dataKey="Dismissal" fill="#F44336" barSize={20} name="Dismissals" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const initialEmployees = [
  {
    employee_id: 1,
    first_name: "Danielle",
    last_name: "Johnson",
    gender: "Male",
    date_of_birth: "1973-03-14",
    email: "rhodespatricia@example.org",
    phone_number: "001-260-501-3389",
    address: "79402 Peterson Drives Apt. 511\nDavisstad, PA 35172",
    hire_date: "2023-07-27",
    job_title: "Psychiatric nurse",
    department_id: 1,
    employment_status: "Resigned",
    bank_account_number: "RDMC84959310341316",
    bank_name: "Chavez-Flowers",
    tax_id: "167-48-5821",
    national_id: "215-86-4375",
    termination_date: "2023-08-15",
  },
  {
    employee_id: 2,
    first_name: "Jacqueline",
    last_name: "Sutton",
    gender: "Female",
    date_of_birth: "1989-04-04",
    email: "frankgray@example.net",
    phone_number: "001-783-550-3056x413",
    address: "724 John Points Suite 969\nCoxberg, NY 65187",
    hire_date: "2016-05-29",
    job_title: "Art gallery manager",
    department_id: 2,
    employment_status: "Active",
    bank_account_number: "DEUF69166978480184",
    bank_name: "Peterson, Carter and Moore",
    tax_id: "004-93-4316",
    national_id: "513-98-2928",
    termination_date: null,
  },
  {
    employee_id: 3,
    first_name: "William",
    last_name: "Rodriguez",
    middle_name: "Colleen",
    gender: "Male",
    date_of_birth: "1997-04-26",
    email: "ericfarmer@example.net",
    phone_number: "001-380-395-7015x43039",
    address: "227 Joseph Well\nBrandtside, WV 96174",
    hire_date: "2022-05-25",
    job_title: "Insurance underwriter",
    department_id: 1,
    employment_status: "Resigned",
    bank_account_number: "MVUL78713315098393",
    bank_name: "Jones Ltd",
    tax_id: "061-30-1105",
    national_id: "033-43-1161",
    termination_date: "2022-12-10",
  },
];

const initialDepartments = [
  {
    id: 1,
    name: "Department 1",
    location: "Shawnton",
    manager: initialEmployees[0],
  },
  {
    id: 2,
    name: "Department 2",
    location: "South Robert",
    manager: initialEmployees[1],
  },
  {
    id: 3,
    name: "Department 3",
    location: "Harrisberg",
    manager: null,
  },
];

function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [employees, setEmployees] = useState(initialEmployees);
  const [departments, setDepartments] = useState(initialDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDepartmentDetailsOpen, setIsDepartmentDetailsOpen] = useState(false);
  const [isEmployeeDetailsOpen, setIsEmployeeDetailsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [lastSavedEmployee, setLastSavedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    address: "",
    hire_date: "",
    job_title: "",
    department_id: "",
    employment_status: "Active",
    bank_account_number: "",
    bank_name: "",
    tax_id: "",
    national_id: "",
    termination_date: null,
  });
  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    location: "",
    manager_id: "",
  });
  const rowsPerPage = 5;

  const recruitmentDismissalData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const currentYear = new Date().getFullYear();
    return months.map((month, index) => {
      const monthStart = new Date(currentYear, index, 1);
      const monthEnd = new Date(currentYear, index + 1, 0);
      const recruitments = employees.filter((emp) => {
        const hireDate = new Date(emp.hire_date);
        return (
          hireDate >= monthStart &&
          hireDate <= monthEnd &&
          emp.employment_status === "Active"
        );
      }).length;
      const dismissals = employees.filter((emp) => {
        const terminationDate = emp.termination_date ? new Date(emp.termination_date) : null;
        return (
          terminationDate &&
          terminationDate >= monthStart &&
          terminationDate <= monthEnd &&
          emp.employment_status === "Resigned"
        );
      }).length;
      return { month, Recruitment: recruitments, Dismissal: dismissals };
    });
  }, [employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setDepartmentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const validateEmployeeForm = () => {
    const errors = {};
    if (!formData.first_name) errors.first_name = "First name is required";
    if (!formData.last_name) errors.last_name = "Last name is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.date_of_birth) errors.date_of_birth = "Date of birth is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Invalid email format";
    if (!/^\d{10,}$/.test(formData.phone_number))
      errors.phone_number = "Phone number must be at least 10 digits";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.hire_date) errors.hire_date = "Hire date is required";
    if (!formData.job_title) errors.job_title = "Job title is required";
    if (!formData.department_id) errors.department_id = "Department is required";
    if (!formData.employment_status)
      errors.employment_status = "Employment status is required";
    if (!formData.bank_account_number)
      errors.bank_account_number = "Bank account number is required";
    if (!formData.bank_name) errors.bank_name = "Bank name is required";
    if (!formData.tax_id) errors.tax_id = "Tax ID is required";
    if (!formData.national_id) errors.national_id = "National ID is required";
    return errors;
  };

  const validateDepartmentForm = () => {
    const errors = {};
    if (!departmentFormData.name) errors.name = "Department name is required";
    if (!departmentFormData.location) errors.location = "Location is required";
    if (!departmentFormData.manager_id) errors.manager_id = "Manager is required";
    return errors;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const errors = validateEmployeeForm();
    if (Object.keys(errors).length > 0) {
      alert(JSON.stringify(errors, null, 2));
      return;
    }
    let updatedEmployee;
    if (editingEmployee) {
      updatedEmployee = { ...formData, employee_id: editingEmployee.employee_id };
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.employee_id === editingEmployee.employee_id ? updatedEmployee : emp
        )
      );
    } else {
      updatedEmployee = {
        ...formData,
        employee_id: Math.max(...employees.map((emp) => emp.employee_id), 0) + 1,
      };
      setEmployees((prev) => [updatedEmployee, ...prev]);
    }
    setLastSavedEmployee(updatedEmployee);
    setFormData({
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      email: "",
      phone_number: "",
      address: "",
      hire_date: "",
      job_title: "",
      department_id: "",
      employment_status: "Active",
      bank_account_number: "",
      bank_name: "",
      tax_id: "",
      national_id: "",
      termination_date: null,
    });
    setEditingEmployee(null);
    setShowSuccess(true);
    setCurrentPage(1);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    const errors = validateDepartmentForm();
    if (Object.keys(errors).length > 0) {
      alert(JSON.stringify(errors, null, 2));
      return;
    }
    const selectedEmployee = employees.find(
      (emp) => emp.employee_id === parseInt(departmentFormData.manager_id)
    );
    if (!selectedEmployee) {
      alert("Please select a valid manager.");
      return;
    }
    setDepartments((prev) => [
      {
        ...departmentFormData,
        id: prev.length + 1,
        manager: selectedEmployee,
      },
      ...prev,
    ]);
    setDepartmentFormData({ name: "", location: "", manager_id: "" });
    setIsDepartmentModalOpen(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailsOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
      if (filteredEmployees.length <= (currentPage - 1) * rowsPerPage) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    }
  };

  const handleCloseModal = () => {
    const isFormDirty = Object.entries(formData).some(
      ([key, value]) =>
        key !== "employment_status" &&
        key !== "termination_date" &&
        value !== "" &&
        (!editingEmployee || editingEmployee[key] !== value)
    );
    if (
      isFormDirty &&
      !window.confirm("You have unsaved changes. Are you sure you want to close?")
    ) {
      return;
    }
    setIsModalOpen(false);
    setShowSuccess(false);
    setEditingEmployee(null);
    setLastSavedEmployee(null);
    setFormData({
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      email: "",
      phone_number: "",
      address: "",
      hire_date: "",
      job_title: "",
      department_id: "",
      employment_status: "Active",
      bank_account_number: "",
      bank_name: "",
      tax_id: "",
      national_id: "",
      termination_date: null,
    });
  };

  const handleCloseDepartmentModal = () => {
    if (
      Object.values(departmentFormData).some((value) => value !== "") &&
      !window.confirm("You have unsaved changes. Are you sure you want to close?")
    ) {
      return;
    }
    setIsDepartmentModalOpen(false);
    setDepartmentFormData({ name: "", location: "", manager_id: "" });
  };

  const handleViewDepartmentDetails = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentDetailsOpen(true);
  };

  const handleCloseEmployeeDetailsModal = () => {
    setIsEmployeeDetailsOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseDepartmentDetailsModal = () => {
    setIsDepartmentDetailsOpen(false);
    setSelectedDepartment(null);
  };

  const filteredEmployees = useMemo(
    () =>
      employees.filter((emp) =>
        [emp.first_name, emp.last_name, emp.email, String(emp.department_id)]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [employees, searchQuery]
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const currentEmployees = useMemo(
    () =>
      filteredEmployees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [filteredEmployees, currentPage, rowsPerPage]
  );

  const overviewCards = useMemo(() => {
    const totalEmployees = employees.length;
    const departmentsCount = departments.length;
    const newEmployees = employees.filter(
      (emp) =>
        new Date(emp.hire_date) >
        new Date(new Date().setMonth(new Date().getMonth() - 1))
    ).length;
    return [
      {
        title: "Total Employees",
        count: totalEmployees,
        growth:
          totalEmployees > 0
            ? `↑ ${Math.round(
                (totalEmployees / (totalEmployees + 10)) * 100
              )}% from last month`
            : "No change",
        growthColor: totalEmployees > 0 ? "text-green-500" : "text-gray-500",
        action: "View Employees",
        icon: TrendingUp,
        iconColor: "#16a34a",
      },
      {
        title: "Number Of Departments",
        count: departmentsCount,
        growth:
          departmentsCount > 0
            ? `↑ ${Math.round(
                (departmentsCount / (departmentsCount + 2)) * 100
              )}% this month`
            : "No change",
        growthColor: departmentsCount > 0 ? "text-green-500" : "text-gray-500",
        action: "View Departments",
        icon: TrendingUp,
        iconColor: "#0ea5e9",
      },
      {
        title: "New Employees",
        count: newEmployees,
        growth:
          newEmployees > 0
            ? `↑ ${Math.round(
                (newEmployees / (newEmployees + 5)) * 100
              )}% from last month`
            : "No change",
        growthColor: newEmployees > 0 ? "text-green-500" : "text-gray-500",
        action: "Review Applicants",
        icon: TrendingUp,
        iconColor: "#dc2626",
      },
    ];
  }, [employees, departments]);

  return (
    <div className="p-4 bg-blue-500">
      <section className="bg-white border rounded-lg mb-6 p-4">
        <label htmlFor="search" className="sr-only">
          Search employees
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name, email, or department..."
          className="w-full mb-4 p-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
          value={searchQuery}
          onChange={handleSearch}
          aria-describedby="search-description"
        />
        <span id="search-description" className="sr-only">
          Search employees by name, email, or department
        </span>
        <div className="flex flex-wrap gap-3">
          {["overview", "list", "department"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm capitalize ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
              aria-pressed={selectedTab === tab}
              aria-controls={`panel-${tab}`}
              id={`tab-${tab}`}
            >
              {tab === "overview"
                ? "Employee Overview"
                : tab === "list"
                ? "Employee List"
                : "Department"}
            </button>
          ))}
        </div>
      </section>

      {selectedTab === "overview" && (
        <section className="bg-white border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Employee Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-6">
            {overviewCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
          <RecruitmentDismissalBarChart data={recruitmentDismissalData} />
        </section>
      )}

      {selectedTab === "list" && (
        <section className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee List</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg border hover:bg-indigo-700"
              aria-label="Add new employee"
            >
              <FiPlus /> Add New Employee
            </button>
          </div>
          <div className="overflow-x-auto">
            {currentEmployees.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No employees found.
              </p>
            ) : (
              <>
                <table
                  className="min-w-full text-sm border hidden sm:table"
                  aria-label="Employee list"
                >
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "First Name",
                        "Last Name",
                        "Email",
                        "Department",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-2 border text-left"
                          scope="col"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((emp) => (
                      <tr key={emp.employee_id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{emp.first_name}</td>
                        <td className="px-4 py-2 border">{emp.last_name}</td>
                        <td className="px-4 py-2 border">{emp.email}</td>
                        <td className="px-4 py-2 border">{emp.department_id}</td>
                        <td className="px-4 py-2 border">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              emp.employment_status === "Active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                            aria-label={`Employee status: ${emp.employment_status}`}
                          >
                            {emp.employment_status}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => handleViewEmployee(emp)}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                              aria-label={`View ${emp.first_name} ${emp.last_name}`}
                            >
                              <FiEdit className="mr-1" /> View
                            </button>
                            <button
                              onClick={() => handleEditEmployee(emp)}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                              aria-label={`Edit ${emp.first_name} ${emp.last_name}`}
                            >
                              <FiEdit className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp.employee_id)}
                              className="flex items-center text-red-600 hover:text-red-800"
                              aria-label={`Delete ${emp.first_name} ${emp.last_name}`}
                            >
                              <FiTrash2 className="mr-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="sm:hidden space-y-4">
                  {currentEmployees.map((emp) => (
                    <div
                      key={emp.employee_id}
                      className="bg-white border rounded-lg p-4 shadow-sm"
                    >
                      <div className="space-y-2">
                        <div><span className="font-medium text-gray-700">First Name:</span> {emp.first_name}</div>
                        <div><span className="font-medium text-gray-700">Last Name:</span> {emp.last_name}</div>
                        <div><span className="font-medium text-gray-700">Gender:</span> {emp.gender}</div>
                        <div><span className="font-medium text-gray-700">Date of Birth:</span> {emp.date_of_birth}</div>
                        <div><span className="font-medium text-gray-700">Email:</span> {emp.email}</div>
                        <div><span className="font-medium text-gray-700">Phone:</span> {emp.phone_number}</div>
                        <div><span className="font-medium text-gray-700">Address:</span> {emp.address}</div>
                        <div><span className="font-medium text-gray-700">Hire Date:</span> {emp.hire_date}</div>
                        <div><span className="font-medium text-gray-700">Job Title:</span> {emp.job_title}</div>
                        <div><span className="font-medium text-gray-700">Department:</span> {emp.department_id}</div>
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              emp.employment_status === "Active"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                            aria-label={`Employee status: ${emp.employment_status}`}
                          >
                            {emp.employment_status}
                          </span>
                        </div>
                        <div><span className="font-medium text-gray-700">Bank Account:</span> {emp.bank_account_number}</div>
                        <div><span className="font-medium text-gray-700">Bank Name:</span> {emp.bank_name}</div>
                        <div><span className="font-medium text-gray-700">Tax ID:</span> {emp.tax_id}</div>
                        <div><span className="font-medium text-gray-700">National ID:</span> {emp.national_id}</div>
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => handleViewEmployee(emp)}
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            aria-label={`View ${emp.first_name} ${emp.last_name}`}
                          >
                            <FiEdit className="mr-1" /> View
                          </button>
                          <button
                            onClick={() => handleEditEmployee(emp)}
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            aria-label={`Edit ${emp.first_name} ${emp.last_name}`}
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(emp.employee_id)}
                            className="flex items-center text-red-600 hover:text-red-800 text-sm"
                            aria-label={`Delete ${emp.first_name} ${emp.last_name}`}
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          {filteredEmployees.length > 0 && currentEmployees.length > 0 && (
            <div className="flex flex-wrap justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, filteredEmployees.length)}{" "}
                of {filteredEmployees.length} employees
              </p>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
                  aria-label="Previous page"
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
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm rounded border hover:bg-gray-100 disabled:opacity-50"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {selectedTab === "department" && (
        <section className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Departments</h2>
            <button
              onClick={() => setIsDepartmentModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg border hover:bg-indigo-700"
              aria-label="Add new department"
            >
              <FiPlus /> Add New Department
            </button>
          </div>
          <p className="mb-4">
            Manage organisation departments and their details.
          </p>
          {departments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No departments found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white shadow rounded-lg p-4 border"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dept.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Location:</span>{" "}
                    {dept.location}
                  </div>
                  <div className="text-sm text-gray-600 mb-4 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">
                      Manager:
                    </span>
                    <img
                      src={dept.manager?.picture || "/default-avatar.png"}
                      alt={`${dept.manager?.first_name || "Unknown"} ${dept.manager?.last_name || ""}'s profile`}
                      className="h-12 w-12 rounded-full object-cover mr-2"
                    />
                    {dept.manager ? `${dept.manager.first_name} ${dept.manager.last_name}` : 'No manager assigned'}
                  </div>
                  <button
                    onClick={() => handleViewDepartmentDetails(dept)}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
                    aria-label={`View details for ${dept.name}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close employee modal"
            >
              ×
            </button>
            {showSuccess ? (
              <EmployeeDetails
                employee={lastSavedEmployee}
                onClose={handleCloseModal}
              />
            ) : (
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <h2 className="text-black font-bold text-md">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <p className="text-gray-500 font-light text-sm mb-8">
                  {editingEmployee
                    ? "Update employee information"
                    : "Enter employee information to create a new record"}
                </p>
                {[
                  { label: "First Name", name: "first_name", type: "text" },
                  { label: "Last Name", name: "last_name", type: "text" },
                  {
                    label: "Gender",
                    name: "gender",
                    type: "select",
                    options: ["", "Male", "Female", "Other"],
                  },
                  { label: "Date of Birth", name: "date_of_birth", type: "date" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone_number", type: "tel" },
                  { label: "Address", name: "address", type: "text" },
                  { label: "Hire Date", name: "hire_date", type: "date" },
                  { label: "Job Title", name: "job_title", type: "text" },
                  {
                    label: "Department",
                    name: "department_id",
                    type: "select",
                    options: ["", ...departments.map((dept) => dept.id)],
                  },
                  {
                    label: "Employment Status",
                    name: "employment_status",
                    type: "select",
                    options: ["Active", "Resigned"],
                  },
                  {
                    label: "Bank Account Number",
                    name: "bank_account_number",
                    type: "text",
                  },
                  { label: "Bank Name", name: "bank_name", type: "text" },
                  { label: "Tax ID", name: "tax_id", type: "text" },
                  { label: "National ID", name: "national_id", type: "text" },
                ].map(({ label, name, type, options }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-light text-black mb-1"
                    >
                      {label}
                    </label>
                    {type === "select" ? (
                      <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                      >
                        {options.map((option) => (
                          <option
                            key={option}
                            value={option}
                            disabled={option === ""}
                          >
                            {option || `Select ${label}`}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                      />
                    )}
                  </div>
                ))}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    {editingEmployee ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {isDepartmentModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseDepartmentModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseDepartmentModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close department modal"
            >
              ×
            </button>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <h2 className="text-black font-bold text-md">
                Add New Department
              </h2>
              <p className="text-gray-500 font-light text-sm mb-8">
                Enter department information to create a new record
              </p>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-light text-black mb-1"
                >
                  Department Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={departmentFormData.name}
                  onChange={handleDepartmentChange}
                  required
                  placeholder="Enter department name"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-light text-black mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={departmentFormData.location}
                  onChange={handleDepartmentChange}
                  required
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="manager_id"
                  className="block text-sm font-light text-black mb-1"
                >
                  Manager
                </label>
                <select
                  id="manager_id"
                  name="manager_id"
                  value={departmentFormData.manager_id}
                  onChange={handleDepartmentChange}
                  required
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                >
                  <option value="" disabled>
                    Select Manager
                  </option>
                  {employees.map((emp) => (
                    <option key={emp.employee_id} value={emp.employee_id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEmployeeDetailsOpen && selectedEmployee && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseEmployeeDetailsModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseEmployeeDetailsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close employee details modal"
            >
              ×
            </button>
            <EmployeeDetails
              employee={selectedEmployee}
              onClose={handleCloseEmployeeDetailsModal}
            />
          </div>
        </div>
      )}

      {isDepartmentDetailsOpen && selectedDepartment && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={handleCloseDepartmentDetailsModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseDepartmentDetailsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close department details modal"
            >
              ×
            </button>
            <DepartmentDetails
              department={selectedDepartment}
              onClose={handleCloseDepartmentDetailsModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;