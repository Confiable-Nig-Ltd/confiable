import React, { useMemo } from 'react';
import { formatCurrencyDisplay } from '@/utils/currency';

const Dashboard = ({ records }) => {
  const stats = useMemo(() => {
    return {
      totalRecords: records.length,
      totalValue: records.reduce((sum, r) => sum + r.total, 0),
      outstandingBalance: records.reduce((sum, r) => sum + r.balance, 0),
      completedRecords: records.filter(r => r.balance <= 0).length
    };
  }, [records]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Total Records</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.totalRecords}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Total Value</h3>
        <p className="text-2xl font-bold text-green-600">{formatCurrencyDisplay(stats.totalValue)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Outstanding</h3>
        <p className="text-2xl font-bold text-red-600">{formatCurrencyDisplay(stats.outstandingBalance)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{stats.completedRecords}</p>
      </div>
    </div>
  );
};

export default Dashboard;