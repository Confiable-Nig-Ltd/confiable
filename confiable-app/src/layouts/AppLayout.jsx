import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { accentClassNames, cn, getPageTitle } from "@/lib/utils";
import { navSetting } from "../components/app-layout/navSettings";
import NavButton from "../components/app-layout/NavButton";
import Logo from "../components/general/Logo";
import NotificationBell from "../components/app-layout/NotificationBell";

export default function AppLayout() {
  const { accent, accentSoftBgColor } = accentClassNames;
  const currentPath = useLocation().pathname
  const pageTitle = getPageTitle(currentPath)

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row md:overflow-hidden">
      {/* Mobile sidebar (overlay) */}
      <div
        className={cn(`fixed inset-0 bg-opacity-50 z-30 md:hidden transition-opacity ${
          sidebarOpen ? "block" : "hidden"
        }`, accent)}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] bg-white p-6 z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-[200px] md:block`}
      >
        <div className="flex justify-between items-center mb-10">
          <Logo />
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {navSetting.map((navItem) => (
            <NavButton
              key={navItem.path}
              icon={navItem.icon}
              text={navItem.text}
              path={navItem.path}
              action={setSidebarOpen}
            />
          ))}
        </nav>
      </aside>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-[80px] bg-white shadow flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl text-gray-500 font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-6">
            <NotificationBell count={5} />
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </header>

        {/* Main content */}
        <main className={cn("flex-1 overflow-auto bg-gray-50 p-4 md:p-6", accentSoftBgColor)}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
