import { Outlet, NavLink } from "react-router-dom";
import Logo from "../components/general/Logo";
import { accentClassNames, cn } from "@/lib/utils";

export default function MainLayout() {
  const { accentText } = accentClassNames

  return (
    <div>
      <div className="flex w-screen items-center justify-between px-2 md:px-8 h-15 border">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
        <NavLink className={cn('font-semibold', accentText)} to={"/signup"}>Get Started</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
