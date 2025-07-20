// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { User, Menu, X } from "lucide-react";
// import { accentClassNames, cn, getPageTitle } from "@/lib/utils";
// import { navSetting } from "../components/app-layout/navSettings";
// import NavButton from "../components/app-layout/NavButton";
// import Logo from "../components/general/Logo";
// import NotificationBell from "../components/app-layout/NotificationBell";

// export default function AppLayout() {
//   const { accentSoftBgColor } = accentClassNames;
//   const currentPath = useLocation().pathname;
//   const pageTitle = getPageTitle(currentPath);

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="w-screen h-screen flex flex-col md:flex-row md:overflow-hidden">
//       {/* Mobile sidebar (overlay) */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
//           sidebarOpen ? "block" : "hidden"
//         }`}
//         onClick={() => setSidebarOpen(false)}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-[250px] bg-white p-6 z-40 transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 md:static md:w-[200px] md:block`}
//       >
//         <div className="flex justify-between items-center mb-10">
//           <Logo />
//           <button
//             className="md:hidden"
//             onClick={() => setSidebarOpen(false)}
//             aria-label="Close sidebar"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <nav className="flex flex-col gap-4">
//           {navSetting.map((navItem) => (
//             <NavButton
//               key={navItem.path}
//               icon={navItem.icon}
//               text={navItem.text}
//               path={navItem.path}
//               action={setSidebarOpen}
//             />
//           ))}
//         </nav>
//       </aside>

//       {/* Main content wrapper */}
//       <div className="flex flex-col flex-1">
//         {/* Header */}
//         <header className="h-[80px] bg-white shadow flex items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-4">
//             {/* Hamburger menu for mobile */}
//             <button
//               className="md:hidden"
//               onClick={() => setSidebarOpen(true)}
//               aria-label="Open sidebar"
//             >
//               <Menu className="w-6 h-6 text-gray-600" />
//             </button>
//             <h1 className="text-2xl text-gray-500 font-semibold">
//               {pageTitle}
//             </h1>
//           </div>
//           <div className="flex items-center gap-6">
//             <NotificationBell count={5} />
//             <User className="w-6 h-6 text-gray-600" />
//           </div>
//         </header>

//         {/* Main content */}
//         <main
//           className={cn(
//             "flex-1 overflow-auto bg-gray-50 p-4 md:p-6",
//             accentSoftBgColor
//           )}
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { accentClassNames, cn } from "@/lib/utils";
import { navSetting } from "../components/app-layout/navSettings";
import NavButton from "../components/app-layout/NavButton";
import Logo from "../components/general/Logo";
import NotificationBell from "../components/app-layout/NotificationBell";

export default function AppLayout() {
  const { accentSoftBgColor } = accentClassNames;
  // const currentPath = useLocation().pathname;
  // const pageTitle = getPageTitle(currentPath);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row md:overflow-hidden">
      {/* Mobile sidebar (overlay) */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
          sidebarOpen ? "block" : "hidden"
        }`}
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything here..."
                className="w-[300px] py-2 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                    stroke="#64748B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 14L11.1 11.1"
                    stroke="#64748B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <NotificationBell count={5} />
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">
                  Confiable Nig. Ltd
                </span>
                <span className="text-xs text-gray-500">Owner</span>
              </div>
              <img
                src="/confiableLogoSm.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 overflow-auto bg-gray-50 p-4 md:p-6",
            accentSoftBgColor
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
