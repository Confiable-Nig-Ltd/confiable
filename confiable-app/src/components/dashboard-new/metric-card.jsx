import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function MetricCard({
  title,
  value,
  change,
  changeText,
  trend,
  icon: Icon,
  bgColor = "bg-white",
  iconColor = "text-gray-600",
}) {
  return (
    <Card className={`${bgColor} border-0 shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center gap-2">
              {change && trend && (
                <div className="flex items-center gap-1">
                  {trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {change}
                  </span>
                </div>
              )}
              <span className="text-xs text-gray-500">{changeText}</span>
            </div>
          </div>

          <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
