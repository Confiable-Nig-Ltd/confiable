import { FcGoogle } from "react-icons/fc";
import { accentClassNames, cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function GoogleOption({
  buttonText,
  bottomText,
  ctaText,
  ctaPath,
}) {
  const { accentText, accentBorder } = accentClassNames;
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-around items-center gap-2">
        <div className="h-0 w-full border border-gray-200"></div>
        <span className="text-gray-300">Or</span>
        <div className="h-0 w-full border border-gray-200"></div>
      </div>
      <button
        className={cn(
          "w-full flex cursor-pointer hover:bg-gray-100 transition justify-center gap-4 font-semibold items-center border-2 p-2 rounded-xl",
          accentText,
          accentBorder
        )}
      >
        <FcGoogle className="text-xl" />
        {buttonText}
      </button>
      <div className="flex justify-center gap-4 items-center">
        <span className="text-gray-500">{bottomText}</span>
        <NavLink to={ctaPath}>
          <span className={cn("font-semibold", accentText)}>{ctaText}</span>
        </NavLink>
      </div>
    </div>
  );
}
