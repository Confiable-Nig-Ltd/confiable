// "use client";

// import { costComponents } from "@/src/data/summaryData";
// import { Pie, PieChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
// } from "@/components/ui/chart";

// const topCostComponents = costComponents
//   .sort((a, b) => -(a.cost - b.cost))
//   .slice(0, 5);
// console.log(topCostComponents);

// const chartData = [
//   {
//     group: "item1",
//     value: topCostComponents[0]?.cost,
//     fill: "var(--color-item1)",
//   },
//   {
//     group: "item2",
//     value: topCostComponents[1]?.cost,
//     fill: "var(--color-item2)",
//   },
//   {
//     group: "item3",
//     value: topCostComponents[2]?.cost,
//     fill: "var(--color-item3)",
//   },
//   {
//     group: "item4",
//     value: topCostComponents[3]?.cost,
//     fill: "var(--color-item4)",
//   },
//   {
//     group: "item5",
//     value: topCostComponents[4]?.cost,
//     fill: "var(--color-item5)",
//   },
// ].sort((a, b) => -(a.value - b.value));

// const chartConfig = {
//   value: {
//     label: "Value",
//   },
//   item1: {
//     label: topCostComponents[0]?.component,
//     color: topCostComponents[0]?.component ? "var(--chart-1)" : '',
//   },
//   item2: {
//     label: topCostComponents[1]?.component,
//     color: topCostComponents[1]?.component ? "var(--chart-2)" : '',
//   },
//   item3: {
//     label: topCostComponents[2]?.component,
//     color: topCostComponents[2]?.component ? "var(--chart-3)" : '',
//   },
//   item4: {
//     label: topCostComponents[3]?.component,
//     color: topCostComponents[3]?.component ? "var(--chart-4)" : '',
//   },
//   item5: {
//     label: topCostComponents[4]?.component,
//     color: topCostComponents[4]?.component ? "var(--chart-5)" : '',
//   },
// };

// export function ChartPieDonut() {
//   return (
//     <>
//       <Card className="flex flex-col w-full h-full border-none shadow-none">
//         <CardHeader className="items-center pb-0">
//           <CardTitle>
//             <h2 className="text-gray-500 mb-4 font-semibold text-xl">
//               Cost Breakdown
//             </h2>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex-1 pb-0">
//           <ChartContainer
//             config={chartConfig}
//             className="mx-auto aspect-auto h-full"
//           >
//             <PieChart>
//               <ChartTooltip
//                 cursor={true}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="group"
//                 innerRadius={45}
//                 outerRadius={80}
//               />
//               <ChartLegend
//                 className="grid grid-cols-2"
//                 content={<ChartLegendContent nameKey={"group"} />}
//               />
//             </PieChart>
//           </ChartContainer>
//         </CardContent>
//         <CardFooter className="flex justify-end gap-2 text-sm">
//           {/* <div className="flex items-center gap-2 leading-none font-medium">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="text-muted-foreground leading-none">
//           Showing total visitors for the last 6 months
//         </div> */}
//           <CardDescription>Top {topCostComponents.length} Cost Elements</CardDescription>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }
