import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const accentClassNames = {
  accent: "bg-[#0556ED]",
  accentHover: "hover:bg-[#7DA6F2]",
  accentHoverText: "hover:text-[#7DA6F2]",
  accentText: "text-[#0556ED]",
  accentBorder: "border-[#0556ED]",
  accentSoftBgColor: "bg-[#F3F3F3]",
  accentBgColor30: "bg-[#0556ED4D]",
  accentBgSecondary: "bg-[#7DA6F2]",
  accentBorderSecondary: "border-[#7DA6F2]",
  accentTextSecondary: "text-[#7DA6F2]",
};

export function getPageTitle(currentPath) {
  const pages = [
    "Dashboard",
    "Employees",
    "Payroll",
    "Inventory",
    "Invoices",
    "Banking",
    "Settings",
  ];

  return (
    pages.find((page) =>
      currentPath.toLowerCase().includes(page.toLowerCase())
    ) || "Page not found"
  );
}
