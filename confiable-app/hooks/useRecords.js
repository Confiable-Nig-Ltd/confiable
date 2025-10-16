import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { parseCurrencyInput, formatCurrencyInput } from "../utils/currency";
import { validateForm } from "../utils/validation";

export const useRecords = (records, setRecords, consignees) => {
  const [form, setForm] = useState({
    consignee: "",
    billOfLading: "",
    containers: "",
    item: "",
    tonnage: "",
    shipper: "",
    terminalFee: "",
    shippingFee: "",
    transport: "",
    agency: "",
    paar: "",
    duty: "",
    amountPaid: "",
    bank: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [paymentInputs, setPaymentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const computeTotalFromForm = () => {
    return (
      parseCurrencyInput(form.terminalFee) +
      parseCurrencyInput(form.shippingFee) +
      parseCurrencyInput(form.transport) +
      parseCurrencyInput(form.agency) +
      parseCurrencyInput(form.paar) +
      parseCurrencyInput(form.duty)
    );
  };

  const resetForm = () => {
    setForm({
      consignee: "",
      billOfLading: "",
      containers: "",
      item: "",
      tonnage: "",
      shipper: "",
      terminalFee: "",
      shippingFee: "",
      transport: "",
      agency: "",
      paar: "",
      duty: "",
      amountPaid: "",
      bank: "",
    });
    setEditingId(null);
    setErrors({});
  };

  const handleSaveRecord = () => {
    const validationErrors = validateForm(form, computeTotalFromForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert(`Please fix the following errors:\n${Object.values(validationErrors).join('\n')}`);
      return;
    }

    setIsLoading(true);
    
    try {
      const total = computeTotalFromForm();
      const initialPaid = parseCurrencyInput(form.amountPaid);
      const balance = total - initialPaid;

      const recordPayload = {
        id: editingId || uuidv4(),
        ...form,
        terminalFee: parseCurrencyInput(form.terminalFee),
        shippingFee: parseCurrencyInput(form.shippingFee),
        transport: parseCurrencyInput(form.transport),
        agency: parseCurrencyInput(form.agency),
        paar: parseCurrencyInput(form.paar),
        duty: parseCurrencyInput(form.duty),
        total,
        balance,
        payments: initialPaid > 0 ? [
          {
            id: uuidv4(),
            amount: initialPaid,
            bank: form.bank || "N/A",
            date: new Date().toISOString().split("T")[0],
          },
        ] : [],
        createdAt: editingId ? records.find(r => r.id === editingId)?.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        setRecords(prev => prev.map(r => r.id === editingId ? recordPayload : r));
        setEditingId(null);
      } else {
        setRecords(prev => [...prev, recordPayload]);
      }

      resetForm();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRecord = (id) => {
    const rec = records.find((r) => r.id === id);
    if (!rec) return;
    
    setForm({
      consignee: rec.consignee || "",
      billOfLading: rec.billOfLading || "",
      containers: rec.containers || "",
      item: rec.item || "",
      tonnage: rec.tonnage || "",
      shipper: rec.shipper || "",
      terminalFee: formatCurrencyInput(rec.terminalFee || 0),
      shippingFee: formatCurrencyInput(rec.shippingFee || 0),
      transport: formatCurrencyInput(rec.transport || 0),
      agency: formatCurrencyInput(rec.agency || 0),
      paar: formatCurrencyInput(rec.paar || 0),
      duty: formatCurrencyInput(rec.duty || 0),
      amountPaid: "",
      bank: "",
    });
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRecord = (id) => {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    setRecords(prev => prev.filter((r) => r.id !== id));
  };

  const openUpdateModal = (record) => {
    setPaymentInputs((prev) => ({ 
      ...prev, 
      [record.id]: { amount: "", bank: "", date: "" } 
    }));
  };

  const handleSavePaymentFromModal = (recordId) => {
    const input = paymentInputs[recordId] || {};
    const rawAmount = parseCurrencyInput(input.amount);
    if (!rawAmount || rawAmount <= 0) {
      alert("Enter a valid payment amount");
      return;
    }

    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;
        
        const newPayment = {
          id: uuidv4(),
          amount: rawAmount,
          bank: input.bank || "N/A",
          date: input.date || new Date().toISOString().split("T")[0],
        };
        
        const updatedPayments = [...(r.payments || []), newPayment];
        const totalReceived = updatedPayments.reduce((s, p) => s + p.amount, 0);
        const newBalance = r.total - totalReceived;
        
        if (newBalance < 0) {
          alert("This payment would exceed the total due. Adjust the amount.");
          return r;
        }
        
        return { 
          ...r, 
          payments: updatedPayments, 
          balance: newBalance,
          updatedAt: new Date().toISOString()
        };
      })
    );

    setPaymentInputs((prev) => ({ 
      ...prev, 
      [recordId]: { amount: "", bank: "", date: "" } 
    }));
  };

  return {
    form,
    setForm,
    editingId,
    setEditingId,
    paymentInputs,
    setPaymentInputs,
    errors,
    isLoading,
    handleSaveRecord,
    handleEditRecord,
    handleDeleteRecord,
    handleSavePaymentFromModal,
    openUpdateModal,
    resetForm,
    computeTotalFromForm
  };
};