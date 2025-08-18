import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn, accentClassNames } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function NavButton({ path, text, action, icon, subItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = useLocation().pathname;
  const { accentBorder, accentText, accentSoftBgColor, accentHoverText } =
    accentClassNames;
  const hasSubItems = Array.isArray(subItems) && subItems.length > 0;
  const isActive = hasSubItems
    ? currentPath.toLowerCase().startsWith(path?.toLowerCase() || "") ||
      subItems.some((item) =>
        currentPath.toLowerCase().includes(item.path.toLowerCase())
      )
    : currentPath.toLowerCase().includes(path?.toLowerCase() || "");
  const activeClassNames = "border-l-4 font-bold rounded-sm";

  const handleClick = (e) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      action(false);
    }
  };

  const content = (
    <div
      className={cn(
        "w-full flex transition justify-start gap-4 items-center p-2",
        isActive ? accentBorder : "",
        isActive ? activeClassNames : "",
        isActive ? accentText : "",
        isActive ? accentSoftBgColor : "",
        isActive ? "" : accentHoverText
      )}
    >
      {icon}
      <span className="flex-1">{text}</span>
      {hasSubItems && (
        <span className="ml-auto">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </div>
  );

  return (
    <div>
      {hasSubItems ? (
        <div onClick={handleClick} className="cursor-pointer">
          {content}
        </div>
      ) : (
        <NavLink to={path} onClick={handleClick}>
          {content}
        </NavLink>
      )}

      {hasSubItems && isOpen && (
        <div className="ml-4 space-y-1">
          {subItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              action={action}
            />
          ))}
        </div>
      )}
    </div>
  );
}
