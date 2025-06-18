// components/NotificationBell.jsx
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, accentClassNames } from "@/lib/utils";

const NotificationBell = ({ count = 0 }) => {
  const { accentBgColor30, accentText } = accentClassNames;
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <Bell className="w-6 h-6 text-muted-foreground" />
      {count > 0 && (
        <Badge
          variant="secondary"
          className={cn("absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full", accentBgColor30, accentText)}
        >
          {count > 99 ? '99+' : count}
        </Badge>
      )}
    </div>
  );
};

export default NotificationBell;
