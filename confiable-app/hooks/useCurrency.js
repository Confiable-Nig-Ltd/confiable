import { useMemo } from 'react';

export const useCurrency = () => {
  const formatCurrencyInput = (value) => {
    if (value === null || value === undefined) return "";
    const cleaned = value.toString().replace(/[^\d.-]/g, "");
    if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") return cleaned;
    const parts = cleaned.split(".");
    const intPart = parts[0].replace(/^0+(?=\d)/, "");
    const intFormatted = Number(intPart || 0).toLocaleString("en-US");
    return parts.length > 1 ? `${intFormatted}.${parts[1]}` : intFormatted;
  };

  const parseCurrencyInput = (value) => {
    if (!value && value !== 0) return 0;
    const cleaned = value.toString().replace(/,/g, "");
    const n = Number(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const formatCurrencyDisplay = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);

  return {
    formatCurrencyInput,
    parseCurrencyInput,
    formatCurrencyDisplay
  };
};