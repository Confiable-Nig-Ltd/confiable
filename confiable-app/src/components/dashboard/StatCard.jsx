import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  title,
  amount,
  delta,
  displayTrend,
  icon,
  iconBgColor = "bg-muted",
}) {
  const isPositive = delta > 0;

  return (
    <Card className="shadow-none p-0 border-none  flex flex-col justify-center h-full">
      <CardContent className="flex px-4 justify-between items-center ">
        <div className=" flex flex-col justify-between gap-1 xl:gap-2 ">
          <span className="text-sm text-muted-foreground font-bold">
            {title}
          </span>
          <span className={`text-lg xl:text-2xl font-bold ${amount.charAt(0) == '-' ? 'text-red-600' : 'text-black'}`}>{amount}</span>
          {displayTrend && (
            <div className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`truncate whitespace-nowrap ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {Math.abs(delta)}% from previous year
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBgColor}`}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
