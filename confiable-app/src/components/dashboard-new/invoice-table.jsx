import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InvoiceTable() {
  const invoices = [
    {
      company: "Acme Corp",
      dueDate: "Due Feb 13",
      amount: "₦ 1,000,000",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      company: "TechStart Inc.",
      dueDate: "Due Feb 06",
      amount: "₦ 3,000,000",
      status: "Overdue",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      company: "Warehouse ABD",
      dueDate: "Due Feb 15",
      amount: "₦ 6,000,000",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      company: "Global Solutions",
      dueDate: "Due Feb 01",
      amount: "₦ 2,000,000",
      status: "Overdue",
      statusColor: "bg-red-100 text-red-800",
    },
  ]

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">OUTSTANDING INVOICES</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{invoice.company}</div>
                <div className="text-xs text-gray-500">{invoice.dueDate}</div>
              </div>

              <div className="text-right space-y-2">
                <div className="font-semibold text-gray-900">{invoice.amount}</div>
                <Badge variant="secondary" className={`text-xs ${invoice.statusColor} border-0`}>
                  {invoice.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
