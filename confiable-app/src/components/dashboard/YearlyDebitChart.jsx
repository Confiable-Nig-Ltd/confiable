"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMemo } from "react";

// Example ledgerEntries array
const ledgerEntries = [
  {
    entry_id: "ENT002",
    account_id: "ACC002",
    debit: 15000000,
    credit: 0,
    entry_date: "2024-01-20",
    reference: "INV001-CEM",
    description: "Purchase of cement, iron rods, and roofing sheets",
    transaction_type: "Inventory Purchase",
    source_id: "SUP2024-01-20",
    status: "paid"
  },
  {
    entry_id: "ENT003",
    account_id: "ACC002",
    debit: 2500000,
    credit: 0,
    entry_date: "2024-03-12",
    reference: "INV002-LOG",
    description: "Logistics for delivery",
    transaction_type: "Logistics",
    source_id: "SUP2024-03-12",
    status: "paid"
  },
  {
    entry_id: "ENT004",
    account_id: "ACC002",
    debit: 4000000,
    credit: 0,
    entry_date: "2023-11-12",
    reference: "SAL2023",
    description: "Salaries paid",
    transaction_type: "Salaries",
    source_id: "HR2023",
    status: "paid"
  },
  // Add more entries as needed
];

// Helper function to get current year string
const currentYear = new Date().getFullYear();

function getDebitsByTransactionType(data) {
  const result = {};

  data.forEach(entry => {
    const year = new Date(entry.entry_date).getFullYear();
    if (year === currentYear && entry.debit > 0) {
      const type = entry.transaction_type;
      result[type] = (result[type] || 0) + entry.debit;
    }
  });

  return Object.entries(result).map(([type, total]) => ({
    transaction_type: type,
    total_debit: total,
  }));
}

export default function YearlyDebitChart() {
  const chartData = useMemo(() => getDebitsByTransactionType(ledgerEntries), []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Debit Breakdown by Transaction Type (YTD {currentYear})</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transaction_type" />
            <YAxis />
            <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
            <Bar dataKey="total_debit" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
