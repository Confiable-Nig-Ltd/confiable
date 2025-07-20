import React, { useState, useMemo } from 'react';
import { Employees } from '../data/employeeData';
import { Payroll } from '../data/payrollData';

const PayslipGenerator = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // Filter payroll records based on selected employee
  const filteredPayrolls = useMemo(() => {
    return Payroll.filter(p => String(p.employee_id) === selectedEmployeeId);
  }, [selectedEmployeeId]);

  // Get selected payroll data
  const selectedPayroll = useMemo(() => {
    return filteredPayrolls.find(p => p.payment_date === selectedPeriod);
  }, [filteredPayrolls, selectedPeriod]);

  // Get employee details
  const employee = Employees.find(emp => String(emp.employee_id) === selectedEmployeeId);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-blue-50 rounded-xl shadow space-y-6">
      {/* Dropdown Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700">Employee Name</label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => {
              setSelectedEmployeeId(e.target.value);
              setSelectedPeriod('');
            }}
            className="w-full p-2 border border-blue-200 rounded focus:outline-none"
          >
            <option value="">Select Employee</option>
            {Employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.first_name} {emp.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700">Month/Period</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            disabled={!selectedEmployeeId}
            className="w-full p-2 border border-blue-200 rounded focus:outline-none"
          >
            <option value="">Select Period</option>
            {filteredPayrolls.map((payroll) => (
              <option key={payroll.payroll_id} value={payroll.payment_date}>
                {new Date(payroll.pay_period_start).toLocaleString('default', {
                  month: 'long',
                })}{' '}
                {new Date(payroll.pay_period_start).getFullYear()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Payslip Card */}
      {selectedPayroll && employee && (
        <div className="bg-white rounded border border-gray-200 p-4 flex flex-col sm:flex-row justify-between gap-4">
          {/* Left - Employee Info */}
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span>👤</span> {employee.first_name} {employee.last_name}
            </div>
            <div className="flex items-center gap-2">
              📧 <span>{employee.email || 'not available'}</span>
            </div>
            <div className="flex items-center gap-2">
              🧹 <span>{employee.job_title}</span>
            </div>
            <div className="flex items-center gap-2">
              📅 <span>{formatDate(selectedPayroll.payment_date)}</span>
            </div>
          </div>

          {/* Right - Salary Info */}
          <div className="space-y-1 text-sm text-gray-700">
            <h3 className="text-base font-bold mb-2">Salary</h3>
            <div className="flex justify-between">
              <span>Base Salary</span>
              <span>{selectedPayroll.basic_salary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Pay Period</span>
              <span>
                {new Date(selectedPayroll.pay_period_start).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                -{' '}
                {new Date(selectedPayroll.pay_period_end).toLocaleDateString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{selectedPayroll.tax.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg text-blue-600">
              <span>Net Pay</span>
              <span>{selectedPayroll.net_pay.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {selectedPayroll && (
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Generate Payslip
          </button>
          <button className="bg-blue-100 text-blue-600 px-5 py-2 rounded hover:bg-blue-200">
            ⬇ Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PayslipGenerator;
