import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExpenseBreakdown() {
  const expenses = [
    { category: "Salaries", amount: "₦ 1,000,000", percentage: "50.7%", color: "bg-blue-500" },
    { category: "Logistics", amount: "₦ 1,000,000", percentage: "20.3%", color: "bg-orange-500" },
    { category: "Marketing", amount: "₦ 1,000,000", percentage: "17.5%", color: "bg-green-500" },
    { category: "Inventory", amount: "₦ 1,000,000", percentage: "40.9%", color: "bg-cyan-500" },
  ]

  const total = "₦ 4,500,000"

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">EXPENSE BREAKDOWN</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${expense.color}`} />
              <span className="text-sm font-medium text-gray-700">{expense.category}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{expense.amount}</div>
              <div className="text-xs text-gray-500">{expense.percentage}</div>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-sm font-bold text-gray-900">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
