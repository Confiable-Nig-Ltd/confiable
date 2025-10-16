import { parseCurrencyInput } from './currency';

export const validateForm = (form, computeTotalFromForm) => {
  const errors = {};
  
  if (!form.consignee?.trim()) errors.consignee = "Consignee is required";
  if (!form.item?.trim()) errors.item = "Item description is required";
  
  const numericFields = ['terminalFee', 'shippingFee', 'transport', 'agency', 'paar', 'duty'];
  numericFields.forEach(field => {
    const value = parseCurrencyInput(form[field]);
    if (value < 0) errors[field] = "Cannot be negative";
  });

  const total = computeTotalFromForm();
  const initialPaid = parseCurrencyInput(form.amountPaid);
  if (initialPaid > total) {
    errors.amountPaid = "Initial payment cannot exceed total fees";
  }

  return errors;
};