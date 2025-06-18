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

export const navSetting = [
  {
    path: '/dashboard',
    text: 'Dashboard',
    icon: <LuLayoutDashboard />
  },
  {
    path: '/employees',
    text: 'Employees',
    icon: <HiOutlineUserGroup />
  },
  {
    path: '/payroll',
    text: 'Payroll',
    icon: <LuScrollText />
  },
  {
    path: '/inventory',
    text: 'Inventory',
    icon: <IoCubeOutline />
  },
  {
    path: '/invoices',
    text: 'Invoices',
    icon: <TbFileInvoice />
  },
  {
    path: '/banking',
    text: 'Banking',
    icon: <RiBankLine />
  },
  {
    path: '/settings',
    text: 'Settings',
    icon: <GoGear />
  },
]

export function getIcon(searchText){
  return navSetting.find((item) => item.text.toLowerCase() == searchText.toLowerCase())?.icon || <BsGraphUpArrow />
}