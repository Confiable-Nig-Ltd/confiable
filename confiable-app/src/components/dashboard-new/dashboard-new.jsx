"use client";

import { useState } from "react";
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
import MetricCard from "./metric-card";
import ExpenseBreakdown from "./expense-breakdown";
import InvoiceTable from "./invoice-table";
import PayablesTable from "./payables-table";
import RevenueChart from "./revenue-chart";

export default function DashboardNew() {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] = useState("January 2025");

  const metricsData = [
    {
      title: "TOTAL REVENUE",
      value: "₦ 5,450,000.00",
      change: "23%",
      changeText: "from last month",
      trend: "up",
      icon: DollarSign,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "TOTAL EXPENSES",
      value: "₦ 4,500,000.00",
      change: "23%",
      changeText: "from last month",
      trend: "up",
      icon: CreditCard,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "NET PROFIT",
      value: "₦ 10,450,000.00",
      change: "23%",
      changeText: "Margin",
      trend: "up",
      icon: TrendingUp,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "BANK BALANCE",
      value: "₦ 99,450,000.00",
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
      value: "₦ 4,500,000.00",
      change: "23%",
      changeText: "Revenue + Collection",
      trend: "up",
      icon: Banknote,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "OUTSTANDING INVOICES",
      value: "₦ 15,000,000.00",
      change: null,
      changeText: "6 Invoices Pending",
      trend: null,
      icon: FileText,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "UPCOMING PAYABLES",
      value: "₦ 15,000,000.00",
      change: null,
      changeText: "4 Bills to pay",
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
            <ExpenseBreakdown />
            <InvoiceTable />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RevenueChart />
            <PayablesTable />
          </div>
        </div>
      </div>
    </div>
  );
}
