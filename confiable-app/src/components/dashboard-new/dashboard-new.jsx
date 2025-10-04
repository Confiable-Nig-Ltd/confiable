"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Wallet,
  FileText,
  Calendar,
  Banknote,
} from "lucide-react";
import { salesOrder } from "@/src/data/salesOrderData";
import { PurchaseOrder } from "@/src/data/purchaseOrderData";
import { Accounts } from "@/src/data/accountData";
import { ledgerEntry } from "@/src/data/ledgerEntry";
import { Customers } from "@/src/data/customerData";
import { Suppliers } from "@/src/data/supplierData";
import MetricCard from "./metric-card";
import ExpenseBreakdown from "./expense-breakdown";
import InvoiceTable from "./invoice-table";
import PayablesTable from "./payables-table";
import RevenueChart from "./revenue-chart";

export default function DashboardNew() {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] = useState("January 2025");
  const [metrics, setMetrics] = useState({});
  const [expenseData, setExpenseData] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [payables, setPayables] = useState([]);

  const calculateMetrics = () => {
    // Total Revenue
    const totalRevenue = salesOrder.reduce(
      (sum, order) => sum + parseFloat(order.total_amount),
      0
    );

    // Total Expenses
    const totalExpenses = PurchaseOrder.reduce(
      (sum, order) => sum + parseFloat(order.total_amount),
      0
    );

    // Net Profit
    const netProfit = totalRevenue - totalExpenses;

    // Bank Balance
    const bankBalance = Accounts.reduce(
      (sum, account) => sum + parseFloat(account.balance),
      0
    );

    // Outstanding Invoices
    const pendingInvoices = salesOrder.filter(
      (order) => order.status === "pending" || order.status === "unpaid"
    );
    const outstandingAmount = pendingInvoices.reduce(
      (sum, invoice) => sum + parseFloat(invoice.total_amount),
      0
    );

    // Upcoming Payables
    const unpaidPurchases = PurchaseOrder.filter(
      (order) => order.status === "pending" || order.status === "unpaid"
    );
    const payablesAmount = unpaidPurchases.reduce(
      (sum, bill) => sum + parseFloat(bill.total_amount),
      0
    );

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      bankBalance,
      outstandingAmount,
      payablesAmount,
      pendingInvoicesCount: pendingInvoices.length,
      unpaidPurchasesCount: unpaidPurchases.length,
    };
  };

  const getExpenseBreakdown = () => {
    return ledgerEntry
      .filter((entry) => entry.type === "expense")
      .reduce((acc, entry) => {
        acc[entry.category] =
          (acc[entry.category] || 0) + parseFloat(entry.amount);
        return acc;
      }, {});
  };

  const getInvoiceData = () => {
    return salesOrder.map((invoice) => ({
      ...invoice,
      customerName: Customers.find((c) => c.id === invoice.customer_id)?.name,
      status: invoice.status,
      dueDate: invoice.due_date,
      amount: invoice.total_amount,
    }));
  };

  const getRevenueData = (period = "monthly") => {
    const revenueByPeriod = salesOrder.reduce((acc, order) => {
      const date = new Date(order.date);
      const key =
        period === "monthly"
          ? `${date.getMonth() + 1}/${date.getFullYear()}`
          : date.getFullYear().toString();

      acc[key] = (acc[key] || 0) + parseFloat(order.total_amount);
      return acc;
    }, {});

    return Object.entries(revenueByPeriod).map(([period, amount]) => ({
      period,
      amount,
    }));
  };

  const getPayablesData = () => {
    return PurchaseOrder.filter(
      (order) => order.status === "pending" || order.status === "unpaid"
    ).map((payable) => ({
      ...payable,
      supplierName: Suppliers.find((s) => s.id === payable.supplier_id)?.name,
      status: payable.status,
      dueDate: payable.due_date,
      amount: payable.total_amount,
    }));
  };

  useEffect(() => {
    const calculatedMetrics = calculateMetrics();
    setMetrics(calculatedMetrics);
    setExpenseData(getExpenseBreakdown());
    setInvoices(getInvoiceData());
    setRevenueData(getRevenueData(timePeriod.toLowerCase()));
    setPayables(getPayablesData());
  }, [timePeriod, selectedMonth]);

  const formatCurrency = (amount) => {
    return `₦ ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const metricsData = [
    {
      title: "TOTAL REVENUE",
      value: formatCurrency(metrics.totalRevenue || 0),
      change: "23%",
      changeText: "from last month",
      trend: "up",
      icon: DollarSign,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "TOTAL EXPENSES",
      value: formatCurrency(metrics.totalExpenses || 0),
      change: "23%",
      changeText: "from last month",
      trend: "up",
      icon: CreditCard,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "NET PROFIT",
      value: formatCurrency(metrics.netProfit || 0),
      change:
        (
          ((metrics.netProfit || 0) / (metrics.totalRevenue || 1)) *
          100
        ).toFixed(1) + "%",
      changeText: "Margin",
      trend: "up",
      icon: TrendingUp,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "BANK BALANCE",
      value: formatCurrency(metrics.bankBalance || 0),
      change: null,
      changeText: "Available Cash",
      trend: null,
      icon: Wallet,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const secondaryMetrics = [
    {
      title: "CASH FLOW",
      value: formatCurrency(metrics.totalRevenue || 0),
      change: "23%",
      changeText: "Revenue + Collection",
      trend: "up",
      icon: Banknote,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "OUTSTANDING INVOICES",
      value: formatCurrency(metrics.outstandingAmount || 0),
      change: null,
      changeText: `${metrics.pendingInvoicesCount || 0} Invoices Pending`,
      trend: null,
      icon: FileText,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "UPCOMING PAYABLES",
      value: formatCurrency(metrics.payablesAmount || 0),
      change: null,
      changeText: `${metrics.unpaidPurchasesCount || 0} Bills to pay`,
      trend: null,
      icon: Calendar,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-500 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Time Period Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Financial Dashboard
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border bg-white p-1">
              {["Monthly", "Yearly"].map((period) => (
                <Button
                  key={period}
                  variant={timePeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimePeriod(period)}
                  className="text-xs min-w-[80px]"
                >
                  {period}
                </Button>
              ))}
            </div>

            <div className="rounded-lg border bg-white p-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs min-w-[160px]"
                onClick={() => {
                  const nextMonth = new Date(selectedMonth);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setSelectedMonth(
                    nextMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })
                  );
                }}
              >
                {selectedMonth}
              </Button>
            </div>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsData.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Bottom Section - Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ExpenseBreakdown data={expenseData} />
            <InvoiceTable data={invoices} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RevenueChart data={revenueData} timePeriod={timePeriod} />
            <PayablesTable data={payables} />
          </div>
        </div>
      </div>
    </div>
  );
}
