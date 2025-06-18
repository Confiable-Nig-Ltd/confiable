import { accentClassNames, cn } from "@/lib/utils";

export default function DashboardCard({
  title,
  measure,
  value,
  uom,
  isTrackingChange,
  change,
  count,
  icon,
  description
}) {
  const { accentText } = accentClassNames;

  return (
    <div className="w-full h-full flex flex-col justify-around gap-0">
      <div className="flex justify-between w-full items-center">
        <small className="text-gray-500 font-semibold">{title}</small>
        <div className={cn("text-lg", accentText)}>{icon}</div>
      </div>
      <div className="flex justify-start w-full items-center gap-4">
        <p className="font-bold text-2xl text-black">
          {measure}
          {uom && uom}
        </p>
        {value && <p className="font-bold text-2xl text-black">-</p>}
        {value && (
          <p className={cn("font-bold text-xl", accentText)}>${value.toLocaleString()}</p>
        )}
      </div>
      <div className="flex justify-start w-full items-center gap-4">
        {isTrackingChange && (
          <>
            <p className={cn('font-medium text-sm',change >= 0 ? "text-green-500" : "text-red-500")}>
              {change > 0 ? "+" : ""}
              {change}%
            </p>
            <small className="text-gray-500">This month</small>
          </>
        )}
        {!isTrackingChange && (
          <>
            <p className={"text-red-500 font-semibold"}>
              {count && count}
            </p>
            {description && <small className="text-gray-500">{description}</small>}
          </>
        )}
      </div>
    </div>
  );
}
