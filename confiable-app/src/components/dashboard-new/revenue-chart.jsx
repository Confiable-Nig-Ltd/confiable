import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RevenueChart() {
  const chartData = [
    { month: "Jan", revenue: 500000, expenses: 200000, net: 1500000 },
    { month: "Feb", revenue: 500000, expenses: 200000, net: 1500000 },
    { month: "Mar", revenue: 500000, expenses: 200000, net: 1500000 },
    { month: "Apr", revenue: 500000, expenses: 200000, net: 1500000 },
  ]

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">REVENUE & EXPENSES TREND</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {chartData.map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{data.month}</span>
              <div className="flex gap-4 text-xs">
                <span className="text-blue-600">Rev: ₦ {data.revenue.toLocaleString()}</span>
                <span className="text-red-600">Exp: ₦ {data.expenses.toLocaleString()}</span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex h-6 rounded-md overflow-hidden bg-gray-100">
              <div className="bg-blue-500 flex items-center justify-center" style={{ width: "70%" }} />
              <div className="bg-red-500 flex items-center justify-center" style={{ width: "30%" }} />
            </div>

            <div className="text-xs text-gray-500">Net: ₦ {data.net.toLocaleString()}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
