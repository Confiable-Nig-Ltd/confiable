// import DashboardCard from "./DashboardCard";
// import InventoryCard from "./InventoryCard";
// import {
//   dashboardSummaryData,
//   dashboardInventoryData,
// } from "@/src/data/summaryData";
// import RecentOrders from "./RecentOrders";
// import { ChartPieDonut } from "./PieChart";
// import { ChartLineMultiple } from "./LineChart";
// import { cn, accentClassNames } from "@/lib/utils";
// import { FaPlus } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa";

// export default function DashboardGrid() {
//   const totalOrders = dashboardSummaryData[0];
//   const profitMargin = dashboardSummaryData[1];
//   const activeOrders = dashboardSummaryData[2];
//   const lowStock = dashboardSummaryData[3];

//   return (
//     <div className=" min-h-screen  max-w-[1200px] mx-auto">
//       <div className="flex flex-col md:flex-row gap-4 px-4 justify-between md:items-center mb-4 max-w-[1080px] mx-auto">
//         <p className="text-gray-500">Welcome back!</p>
//         <div className="flex flex-col md:flex-row gap-4">
//           <button className={cn('cursor-pointer p-2 rounded-md border text-white text-sm flex gap-2 transition items-center justify-center', accentClassNames.accent, accentClassNames.accentHover)}> <FaPlus /> Quick Recipe</button>
//           <button className={cn('cursor-pointer p-2 rounded-md border-2 text-sm font-medium flex gap-2 transition items-center justify-center', accentClassNames.accentText, accentClassNames.accentHoverText, accentClassNames.accentBorder)}> <FaRegEye /> View Reports</button>
//         </div>
//       </div>
//       <div
//         className="
//           grid
//           justify-center
//           gap-4

//           grid-cols-1
//           grid-rows-[repeat(4,100px)_repeat(1,300px)_repeat(1,500px)_repeat(2,450px)]

//           md:grid-cols-2
//           md:grid-rows-[repeat(2,100px)_repeat(1,400px)_repeat(1,550px)_repeat(1,400px)]
//           lg:grid-rows-[repeat(2,100px)_repeat(1,500px)_repeat(1,550px)_repeat(1,500px)]

//           xl:grid-cols-[repeat(4,250px)]
//           xl:grid-rows-[repeat(10,100px)]
//         "
//       >
//         {/* Item 1 */}
//         <div className="bg-white border rounded-lg p-3">
//           <DashboardCard
//             title={totalOrders.title}
//             measure={totalOrders.measure}
//             value={totalOrders.value}
//             uom={totalOrders.uom}
//             isTrackingChange={true}
//             change={totalOrders.change}
//             icon={totalOrders.icon}
//           />
//         </div>

//         {/* Item 2 */}
//         <div className="bg-white border rounded-lg p-4">
//           <DashboardCard
//             title={profitMargin.title}
//             measure={profitMargin.measure}
//             icon={profitMargin.icon}
//             isTrackingChange={profitMargin.isTrackingChange}
//             change={profitMargin.change}
//             value={profitMargin.value}
//             uom={profitMargin.uom}
//           />
//         </div>

//         {/* Item 3 */}
//         <div className="bg-white border rounded-lg p-4">
//           <DashboardCard
//             title={activeOrders.title}
//             measure={activeOrders.measure}
//             icon={activeOrders.icon}
//             isTrackingChange={activeOrders.isTrackingChange}
//           />
//         </div>

//         {/* Item 4 */}
//         <div className="bg-white border rounded-lg p-4">
//           <DashboardCard
//             title={lowStock.title}
//             measure={lowStock.measure}
//             icon={lowStock.icon}
//             isTrackingChange={lowStock.isTrackingChange}
//             count={lowStock.count}
//             description={lowStock.description}
//           />
//         </div>

//         {/* Item 5 - spans 4 rows and 3 columns */}
//         <div className="bg-white border rounded-lg md:col-span-2 xl:col-span-3 xl:row-span-4">
//           <ChartLineMultiple />
//         </div>

//         {/* Item 6 - spans 4 rows */}
//         <div className="bg-white border rounded-lg xl:row-span-4">
//           <ChartPieDonut />
//         </div>

//         {/* Item 7 - spans 5 rows */}
//         <div className="bg-white border rounded-lg px-2 py-4  xl:row-span-5">
//           <h2 className="text-gray-500 px-2  font-semibold text-xl">
//             Inventory Alert
//           </h2>
//           <div className="overflow-y-scroll h-11/12 py-2">
//             {dashboardInventoryData.map((item, index) => {
//               return (
//                 <InventoryCard
//                   key={index}
//                   material={item.material}
//                   stock={item.stock}
//                   lowMargin={item.lowMargin}
//                   criticalMargin={item.criticalMargin}
//                   uom={item.uom}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Item 8 - spans 5 rows and 3 columns */}
//         <div className="bg-white border rounded-lg p-4 md:col-span-2 xl:col-span-3 xl:row-span-5">
//           <h2 className="text-gray-500 px-2 mb-4 font-semibold text-xl">
//             Recent Orders
//           </h2>
//           <RecentOrders />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { StatCard } from "./StatCard";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatAsNaira } from "@/lib/utils";

export default function DashboardGrid() {
  return (
    <div className="max-w-[1100px] flex flex-col px-2 justify-center mx-auto">
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
        <div className="bg-white border p-2 rounded-md">
          <StatCard
            title="Total Sales"
            amount={formatAsNaira(500000)}
            trendText="+5% from last month"
            icon={<TrendingUp className="text-red-500" />}
            iconBgColor="bg-red-100"
          />
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
        <div className="bg-white border p-2 rounded-md">Cell </div>

        <div className="bg-white border p-2 rounded-md">Cell 5</div>

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
        <div className="bg-white border p-2 rounded-md">Cell 1</div>

        <div
          className="bg-white border p-2 rounded-md"
        >
          Cell 2
        </div>

        <div
          className="bg-white border p-2 rounded-md"
        >
          Cell 3
        </div>
        <div
          className="p-2 rounded-md"
        >
          Blank
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
        <div className="bg-white border p-2 rounded-md">Cell 1</div>

        <div
          className="bg-white border p-2 rounded-md"
        >
          Cell 2
        </div>

        <div
          className="bg-white border p-2 rounded-md"
        >
          Cell 3
        </div>
        <div className="bg-white border p-2 rounded-md row-span-3">Cell 4</div>
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
