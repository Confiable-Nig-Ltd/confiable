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
  const pathToTitle = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/payroll": "Payroll",
    "/inventory": "Inventory",
    "/invoices": "Invoices",
    "/banking": "Banking",
    "/settings": "Settings",
    "/login": "Login",
    "/signup": "Sign Up",
    "/forgot-password": "Forgot Password",
    // Importation routes
    "/importation/container-records": "Container Records",
    "/importation/vessel-imports": "Vessel Imports",
    "/importation/allocation": "Allocation",
    "/importation/distribution": "Distribution",
    "/importation/dollar-tracker": "Dollar Tracker",
  };

  // Remove trailing slash if present
  const normalizedPath = currentPath.endsWith("/")
    ? currentPath.slice(0, -1)
    : currentPath;

  // First try exact match
  if (pathToTitle[normalizedPath]) {
    return pathToTitle[normalizedPath];
  }

  // If no exact match, try to find partial match
  const matchingPath = Object.keys(pathToTitle).find((path) =>
    normalizedPath.toLowerCase().includes(path.toLowerCase())
  );

  return matchingPath
    ? pathToTitle[matchingPath]
    : document.title || "Confiable";
}

export function formatAsNaira(amount) {
  // Check if the amount is a valid number.
  if (typeof amount !== "number" || isNaN(amount)) {
    console.error(
      "Invalid input: Please provide a valid number for the amount."
    );
    return "Invalid Amount"; // Or throw an error, depending on desired error handling
  }

  // Use Intl.NumberFormat for robust currency formatting.
  // 'en-NG' specifies the locale for Nigeria (English as spoken in Nigeria).
  // 'currency' style indicates currency formatting.
  // 'NGN' is the ISO 4217 currency code for Nigerian Naira.
  try {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2, // Ensure at least 2 decimal places for kobo
      maximumFractionDigits: 2, // Ensure at most 2 decimal places
    });
    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `Error: ${amount}`; // Fallback in case of formatting error
  }
}

export function sumByKey(arr, key) {
  // Ensure the input is an array
  if (!Array.isArray(arr)) {
    console.error("Invalid input: First argument must be an array.");
    return 0; // Return 0 or throw an error based on desired behavior for invalid input
  }

  // Use the reduce method to iterate over the array and sum the values
  const sum = arr.reduce((accumulator, currentObject) => {
    // Check if the current object has the specified key and if its value is a number
    if (
      currentObject &&
      typeof currentObject === "object" &&
      !Array.isArray(currentObject) &&
      Object.prototype.hasOwnProperty.call(currentObject, key) &&
      typeof currentObject[key] === "number"
    ) {
      return accumulator + currentObject[key];
    } else {
      // If the key is missing or the value is not a number, skip it
      // and continue with the current accumulated value.
      return accumulator;
    }
  }, 0); // Initialize the accumulator to 0

  return sum;
}

export function sumByKeyInDateRange(arr, key, startDate, endDate) {
  if (!Array.isArray(arr)) {
    console.error("Invalid input: First argument must be an array.");
    return 0;
  }

  const filtered = arr.filter((entry) => {
    const entryDate = new Date(entry.entry_date);
    return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
  });

  return sumByKey(filtered, key);
}

export function percentChange(current, previous) {
  if (typeof current !== "number" || typeof previous !== "number") {
    console.error("Both inputs must be numbers.");
    return 0;
  }

  if (previous === 0) {
    // Avoid division by zero
    return current === 0 ? 0 : 100;
  }

  const change = ((current - previous) / Math.abs(previous)) * 100;
  return Math.round(change);
}

export function getYearDateRange() {
  const now = new Date();
  const year = now.getFullYear();

  const pad = (n) => n.toString().padStart(2, "0");

  const yearStart = `${year}-01-01`;
  const currentDate = `${year}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;

  return { yearStart, currentDate };
}

export function getPreviousYearDateRange() {
  const now = new Date();
  const previousYear = now.getFullYear() - 1;

  const pad = (n) => n.toString().padStart(2, "0");

  const yearStart = `${previousYear}-01-01`;
  const currentDate = `${previousYear}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;

  return { yearStart, currentDate };
}
