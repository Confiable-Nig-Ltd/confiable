import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { formatCurrencyDisplay } from '@/utils/currency';

const UpdatePaymentModal = ({
  isOpen,
  record,
  paymentInputs,
  onPaymentInputChange,
  onSavePayment,
  onClose
}) => {
  const { formatCurrencyInput } = useCurrency();

  if (!isOpen || !record) return null;

  const currentInput = paymentInputs[record.id] || { amount: "", bank: "", date: "" };

  const handleInputChange = (field, value) => {
    onPaymentInputChange({
      ...paymentInputs,
      [record.id]: {
        ...currentInput,
        [field]: field === 'amount' ? formatCurrencyInput(value) : value
      }
    });
  };

  const handleSave = () => {
    onSavePayment(record.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-md p-6">
        <h3 className="text-lg font-semibold mb-3">Add Payment — {record.consignee}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Total: {formatCurrencyDisplay(record.total)} | 
          Balance: <span className={record.balance > 0 ? "text-red-600" : "text-green-700"}>
            {formatCurrencyDisplay(record.balance)}
          </span>
        </p>

        <input
          type="text"
          placeholder="Amount (e.g. 5,000)"
          className="border p-2 rounded-md w-full mb-3"
          value={currentInput.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />

        <input
          type="text"
          placeholder="Bank"
          className="border p-2 rounded-md w-full mb-3"
          value={currentInput.bank}
          onChange={(e) => handleInputChange('bank', e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-md w-full mb-4"
          value={currentInput.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
          >
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePaymentModal;