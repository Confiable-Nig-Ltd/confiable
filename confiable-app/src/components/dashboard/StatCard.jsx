import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, amount, trendText, icon, iconBgColor = "bg-red-100" }) {
  return (
    <Card className="px-4 py-6 shadow-none border-none w-full h-full">
      <CardContent className="flex justify-between items-center p-0">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground font-medium">{title}</span>
          <span className="text-2xl font-bold">{amount}</span>
          <span className="text-xs text-muted-foreground">{trendText}</span>
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
