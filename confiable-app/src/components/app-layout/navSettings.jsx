//Navigation Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { CgBowl } from "react-icons/cg";
import { IoCubeOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { TfiBarChart } from "react-icons/tfi";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuGraduationCap } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuScrollText } from "react-icons/lu";
import { TbFileInvoice } from "react-icons/tb";
import { RiBankLine } from "react-icons/ri";
import { FaBox } from "react-icons/fa";

import { RiShipLine } from "react-icons/ri";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";

export const navSetting = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    path: "/employees",
    text: "Employees",
    icon: <HiOutlineUserGroup />,
  },
  {
    path: "/payroll",
    text: "Payroll",
    icon: <LuScrollText />,
  },
  {
    path: "/inventory",
    text: "Inventory",
    icon: <IoCubeOutline />,
  },
  {
    path: "/invoices",
    text: "Invoices",
    icon: <TbFileInvoice />,
  },
  {
    path: "/banking",
    text: "Banking",
    icon: <RiBankLine />,
  },
  {
    text: "Importation",
    icon: <CiDeliveryTruck />,
    subItems: [
      {
        path: "/importation/container-records",
        text: "Container Records",
        icon: <IoCubeOutline />,
      },
      {
        path: "/importation/vessel-imports",
        text: "Vessel Imports",
        icon: <RiShipLine />,
      },
      {
        path: "/importation/allocation",
        text: "Allocation",
        icon: <MdOutlineInventory2 />,
      },
      {
        path: "/importation/distribution",
        text: "Distribution",
        icon: <TbTruckDelivery />,
      },
      {
        path: "/importation/dollar-tracker",
        text: "Dollar Tracker",
        icon: <BsCurrencyDollar />,
      },
      {
        path: "/importation/clearing",
        text: "Clearing",
        icon: <TbTruckDelivery />,
      },
    ],
  },
  {
    path: "/settings",
    text: "Settings",
    icon: <GoGear />,
  },
];

export function getIcon(searchText) {
  return (
    navSetting.find(
      (item) => item.text.toLowerCase() == searchText.toLowerCase()
    )?.icon || <BsGraphUpArrow />
  );
}
