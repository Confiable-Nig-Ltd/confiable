import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvoice } from "@/contexts/invoice-context";

export function StatisticsCards() {
  const { stats } = useInvoice();

  const cards = [
    {
      title: "Total Invoice",
      value: stats.totalInvoices,
      subtitle: "Invoice Generated",
    },
    {
      title: "Invoice Due",
      value: stats.invoicesDue,
      subtitle: "Invoice due for processing",
    },
    {
      title: "Invoice Processed",
      value: stats.invoicesProcessed,
      subtitle: "Total Processed Invoice",
    },
    {
      title: "Invoice Downloaded",
      value: stats.invoicesDownloaded,
      subtitle: "Total Invoice Download",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-slate-50 gap-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {card.value.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
