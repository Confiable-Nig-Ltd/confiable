// "use client";

// import { profitTrend } from "@/src/data/summaryData";
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
//   ChartLegendContent
// } from "@/components/ui/chart";

// export const description = "A multiple line chart";

// const chartData = profitTrend;

// const chartConfig = {
//   sales: {
//     label: "Sales (GBP)",
//     color: "var(--chart-1)",
//   },
//   profit: {
//     label: "Profit (GBP)",
//     color: "var(--chart-2)",
//   },
// };

// export function ChartLineMultiple() {
//   return (
//     <Card className={"max-h-full shadow-none border-none"}>
//       <CardHeader>
//         <CardTitle>
//           <h2 className="text-gray-500 font-semibold text-xl">
//             Orders Analytics
//           </h2>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className={'max-h-[350px] mx-auto w-full'}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="period"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <Line
//               dataKey="sales"
//               type="monotone"
//               stroke="var(--color-sales)"
//               strokeWidth={2}
//               dot={false}
//             />
//             <Line
//               dataKey="profit"
//               type="monotone"
//               stroke="var(--color-profit)"
//               strokeWidth={2}
//               dot={false}
//             />
//             <ChartLegend content={<ChartLegendContent />} />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         {/* <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 leading-none font-medium">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="text-muted-foreground flex items-center gap-2 leading-none">
//               Showing total visitors for the last 6 months
//             </div>
//           </div>
//         </div> */}
//       </CardFooter>
//     </Card>
//   );
// }
