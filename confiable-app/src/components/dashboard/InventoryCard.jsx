// import { cn } from "@/lib/utils";

// const statusColors = {
//   good: "bg-green-100 text-green-700",
//   low: "bg-orange-100 text-orange-700",
//   critical: "bg-red-100 text-red-700",
// };

// export default function InventoryCard({ material, stock, lowMargin, criticalMargin, uom }) {
//   let status = "good";
//   if (stock <= criticalMargin) {
//     status = "critical";
//   } else if (stock <= lowMargin) {
//     status = "low";
//   }

//   return (
//     <div className="flex items-center justify-between px-2 pt-8 pb-4 border-b border-gray-200">
//       <div>
//         <div className="text-black text-sm font-semibold">{material}</div>
//         <div className="text-gray-500 text-sm">
//           {stock} {uom} remaining
//         </div>
//       </div>
//       <span
//         className={cn(
//           "font-medium px-3 py-1 text-xs rounded-full",
//           statusColors[status]
//         )}
//       >
//         {status}
//       </span>
//     </div>
//   );
// }