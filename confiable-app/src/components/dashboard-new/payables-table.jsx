import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PayablesTable() {
  const payables = [
    {
      company: "Office Supplies & Co.",
      category: "Operations",
      dueDate: "Due: Feb 15",
      amount: "₦ 1,000,000",
    },
    {
      company: "Cloud Services",
      category: "Technology",
      dueDate: "Due: Feb 19",
      amount: "₦ 5,000,000",
    },
    {
      company: "Marketing Agency",
      category: "Marketing",
      dueDate: "Due: Feb 20",
      amount: "₦ 3,000,000",
    },
    {
      company: "Global Solutions",
      category: "Operations",
      dueDate: "Due: Feb 15",
      amount: "₦ 6,000,000",
    },
  ]

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">UPCOMING PAYABLES</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payables.map((payable, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{payable.company}</div>
                <div className="text-xs text-gray-500">
                  {payable.category} • {payable.dueDate}
                </div>
              </div>

              <div className="font-semibold text-gray-900">{payable.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
