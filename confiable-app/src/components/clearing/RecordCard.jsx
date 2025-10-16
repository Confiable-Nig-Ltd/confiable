import React from 'react';
import { formatCurrencyDisplay } from '@/utils/currency';

const RecordCard = ({ record, onEdit, onDelete, onUpdatePayment }) => {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{record.consignee}</h4>
          <p className="text-sm text-gray-600">{record.item}</p>
          <p className="text-xs text-gray-500">{record.billOfLading || "No B/L"}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatCurrencyDisplay(record.total)}</p>
          <p className={record.balance > 0 ? "text-red-600" : "text-green-700"}>
            {formatCurrencyDisplay(record.balance)}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onUpdatePayment(record)}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
        >
          View / Update Payments
        </button>

        <button
          onClick={() => onEdit(record.id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
        >
          Edit
        </button>

        <button 
          onClick={() => onDelete(record.id)} 
          className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecordCard;
