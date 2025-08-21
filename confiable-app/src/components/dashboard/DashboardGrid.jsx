import React from "react";
import { StatCard } from "./StatCard";
import { Wallet } from "lucide-react";
import { formatAsNaira } from "@/lib/utils";
import { businessStats } from "@/src/data/ledgerEntry";

export default function DashboardGrid() {

  const TotalRevenue = () => {
    return (
      <StatCard
        title="TOTAL REVENUE"
        amount={formatAsNaira(businessStats.totalRevenue)}
        delta={businessStats.percentChangeInRevenue}
        displayTrend={true}
        icon={<Wallet className="text-blue-500" />}
        iconBgColor="bg-blue-100"
      />
    );
  }

  const NetProfit = () => {
    return (
      <StatCard
        title="NET PROFIT"
        amount={formatAsNaira(businessStats.totalProfit)}
        delta={businessStats.percentChangeInProfit}
        displayTrend={true}
        icon={<Wallet className="text-green-500" />}
        iconBgColor="bg-green-100"
      />
    );
  }

  const TotalExpenses = () => { 
    return (
      <StatCard
        title="TOTAL EXPENSES"
        amount={formatAsNaira(businessStats.totalExpenses)}
        delta={businessStats.percentChangeInExpenses}
        displayTrend={true}
        icon={<Wallet className="text-red-500" />}
        iconBgColor="bg-red-100"
      />
    );
  }

  return (
    <div className="max-w-[1100px] flex flex-col px-2 justify-center mx-auto bg-indigo-900">
      {/* XL Screens */}
      <div
        className="xl:grid hidden justify-center grid-cols-1 gap-4 p-4
  md:grid-cols-2
  lg:grid-cols-[repeat(3,350px)]
  lg:grid-rows-[repeat(1,40px)_repeat(5,150px)]
  lg:auto-rows-[150px]
  lg:auto-cols-[350px]
"
      >
        <div className="bg-white border p-2 col-span-3 rounded-md">Controls</div>
        {/* <div className="bg-white border p-2 rounded-md">Cell 1</div> */}
        <div className="bg-white border rounded-md">
          <TotalRevenue />
        </div>

        <div
          className="bg-white border p-2 rounded-md 
        lg:row-span-2"
        >
          Cell 2
        </div>

        <div
          className="bg-white border p-2 rounded-md 
        lg:row-span-2"
        >
          Cell 3
        </div>
        <div className="bg-white border rounded-md"><NetProfit /></div>

        <div className="bg-white border p-2 rounded-md"><TotalExpenses /></div>

        <div
          className="bg-white border p-2 rounded-md 
    lg:row-span-3 lg:col-span-2"
        >
          Cell 6
        </div>

        <div
          className="bg-white border p-2 rounded-md 
    lg:row-span-2"
        >
          Cell 7
        </div>
      </div>

      {/* MD & LG Screens */}
      <div
        className="md:grid hidden xl:hidden justify-center grid-cols-1 gap-2
  md:grid-cols-[repeat(2,250px)]
  lg:grid-cols-[repeat(2,350px)]
  md:grid-rows-[repeat(1,40px)_repeat(12,100px)]
"
      >
        <div className="bg-white border p-2 md:col-span-2 rounded-md">Controls</div>
        <div className="bg-white border rounded-md"><TotalRevenue /></div>

        <div
          className="bg-white border rounded-md"
        >
          <NetProfit />
        </div>

        <div
          className="bg-white border rounded-md"
        >
          <TotalExpenses />
        </div>
        <div
          className="p-2 rounded-md"
        >
        </div>
        <div className="bg-white border p-2 rounded-md md:row-span-3">Cell 4</div>
        <div className="bg-white border p-2 rounded-md md:row-span-3">Cell 5</div>

        <div
          className="bg-white border p-2 rounded-md 
    md:row-span-3 md:col-span-2"
        >
          Cell 6
        </div>

        <div
          className="bg-white border p-2 rounded-md 
    md:row-span-4 md:col-span-2"
        >
          Cell 7
        </div>
      </div>
      {/* SM Screens */}
      <div
        className="grid md:hidden justify-center grid-cols-1 gap-2
  grid-rows-[repeat(1,40px)_repeat(16,100px)]
"
      >
        <div className="bg-white border p-2 md:col-span-2 rounded-md">Controls</div>
        <div className="bg-white border rounded-md"><TotalRevenue /></div>

        <div
          className="bg-white border rounded-md"
        >
          <NetProfit />
        </div>

        <div
          className="bg-white border rounded-md"
        >
          <TotalExpenses />
        </div>
        <div className="bg-white border p-2 rounded-md row-span-3">cell 4</div>
        <div className="bg-white border p-2 rounded-md row-span-3">Cell 5</div>

        <div
          className="bg-white border p-2 rounded-md 
    row-span-3 md:col-span-2"
        >
          Cell 6
        </div>

        <div
          className="bg-white border p-2 rounded-md 
    row-span-4 md:col-span-2"
        >
          Cell 7
        </div>
      </div>
    </div>
  );
}
