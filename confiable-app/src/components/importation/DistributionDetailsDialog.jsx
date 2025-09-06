import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DistributionDetailsDialog({
  open,
  onOpenChange,
  distribution,
}) {
  if (!distribution) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Distribution Details</DialogTitle>
          <DialogDescription>
            Detailed information for this distribution record.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Date:</span>{" "}
            {format(
              new Date(distribution.distributionDate),
              "dd/MM/yyyy HH:mm"
            )}
          </div>
          <div>
            <span className="font-medium">Container/BL Number:</span>{" "}
            {distribution.billOfLadingNumber}
          </div>
          <div>
            <span className="font-medium">Total Distributed:</span>{" "}
            {distribution.totalDistributed.toLocaleString()} bales
          </div>
          <div>
            <span className="font-medium">Distributed By:</span>{" "}
            {distribution.distributedBy || "-"}
          </div>
          <div>
            <span className="font-medium">Notes:</span>{" "}
            {distribution.notes || "-"}
          </div>
          <div>
            <span className="font-medium">Employees Involved:</span>
            <ul className="list-disc ml-6 mt-2">
              {distribution.distributions.map((dist, idx) => (
                <li key={idx}>
                  <span className="font-medium">{dist.employeeName}</span>:{" "}
                  {dist.balesReceived.toLocaleString()} bales (Stock:{" "}
                  {dist.previousStock.toLocaleString()} →{" "}
                  {dist.newStock.toLocaleString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} type="button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
