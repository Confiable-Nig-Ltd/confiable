import React, { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

const Card = ({ title, count, growth, growthColor, action, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-3 w-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{count}</div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10`} style={{ backgroundColor: `${iconColor}20` }}>
        {Icon && <Icon className="text-xl" color={iconColor} />}
      </div>
    </div>
    <p className={`text-sm font-medium mb-2 ${growthColor}`}>{growth}</p>
    <button className="text-blue-600 text-sm font-semibold hover:underline">
      {action}
    </button>
  </div>
);

const TransactionTabs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="p-4 rounded-xl shadow-md bg-indigo-700">
        {/* Search bar */}
        <div className="p-4 bg-white border rounded-lg mb-6 mt-2">
          <input
            type="text"
            placeholder="search anything here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm outline-none"
            aria-label="Search"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {["Purchase Order", "Stock Transaction", "Sales Order", "Account", "Customer"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm transition ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card
          title="Total Revenue"
          count="120"
          growthColor="text-green-500"
          icon={TrendingUp}
          iconColor="#22c55e"
        />
        <Card
          title="Total Expenses"
          count="77"
          growthColor="text-green-500"
          icon={TrendingDown}
          iconColor="red"
        />
        <Card
          title="Net Profit"
          count="20"
          growthColor="text-green-500"
          icon={TrendingDown}
          iconColor="red"
        />
        <Card
          title="Cash Flows"
          count="17"
          
        />
      </div>
    </>
  );
};

export default TransactionTabs;

