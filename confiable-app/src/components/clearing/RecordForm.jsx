
import React from "react";
import { useCurrency } from "@/hooks/useCurrency";
import FeeBreakdown from "./FeeBreakdown";

const RecordForm = ({
  form,
  setForm,
  errors,
  isLoading,
  editingId,
  consignees,
  onSaveRecord,
  onResetForm,
}) => {
  const { formatCurrencyInput } = useCurrency();

  // --- compute total fees from form ---
  const computeTotalFromForm = () => {
    const { terminalFee, shippingFee, transport, agency, paar, duty } = form;
    return (
      (Number(terminalFee) || 0) +
      (Number(shippingFee) || 0) +
      (Number(transport) || 0) +
      (Number(agency) || 0) +
      (Number(paar) || 0) +
      (Number(duty) || 0)
    );
  };

  // --- handle form field changes ---
  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      // optionally clear errors when user starts typing
    }
  };

  const handleCurrencyFieldChange = (field, value) => {
    handleFieldChange(field, formatCurrencyInput(value));
  };

  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div>
          <select
            className={`border p-2 rounded-md w-full ${
              errors.consignee ? "border-red-500" : ""
            }`}
            value={form.consignee}
            onChange={(e) => handleFieldChange("consignee", e.target.value)}
          >
            <option value="">Select Consignee</option>
            {consignees.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.consignee && (
            <p className="text-red-500 text-sm mt-1">{errors.consignee}</p>
          )}
        </div>

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Shipper"
          value={form.shipper}
          onChange={(e) => handleFieldChange("shipper", e.target.value)}
        />

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Bill of Lading"
          value={form.billOfLading}
          onChange={(e) => handleFieldChange("billOfLading", e.target.value)}
        />

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Containers"
          value={form.containers}
          onChange={(e) => handleFieldChange("containers", e.target.value)}
        />
      </div>

      {/* Item and Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <input
            type="text"
            className={`border p-2 rounded-md w-full ${
              errors.item ? "border-red-500" : ""
            }`}
            placeholder="Item"
            value={form.item}
            onChange={(e) => handleFieldChange("item", e.target.value)}
          />
          {errors.item && (
            <p className="text-red-500 text-sm mt-1">{errors.item}</p>
          )}
        </div>

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Tonnage"
          value={form.tonnage}
          onChange={(e) => handleFieldChange("tonnage", e.target.value)}
        />

        <div>
          <input
            type="text"
            className={`border p-2 rounded-md w-full ${
              errors.amountPaid ? "border-red-500" : ""
            }`}
            placeholder="Initial Amount Paid (optional)"
            value={form.amountPaid}
            onChange={(e) =>
              handleCurrencyFieldChange("amountPaid", e.target.value)
            }
          />
          {errors.amountPaid && (
            <p className="text-red-500 text-sm mt-1">{errors.amountPaid}</p>
          )}
        </div>

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Bank"
          value={form.bank}
          onChange={(e) => handleFieldChange("bank", e.target.value)}
        />
      </div>

      {/* Fee Breakdown */}
      <FeeBreakdown
        formData={form}
        errors={errors}
        onFieldChange={handleCurrencyFieldChange}
        computeTotalFromForm={computeTotalFromForm}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={onSaveRecord}
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading
            ? "Saving..."
            : editingId
            ? "Update Record"
            : "Save Record"}
        </button>

        {editingId && (
          <button
            onClick={onResetForm}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordForm;
