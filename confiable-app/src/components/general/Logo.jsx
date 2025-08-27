import confiableLogo from "@/src/assets/confiableLogo.png";
import confiableLogoSm from "@/src/assets/confiableLogoSm.png";

export default function Logo({ isConcise }) {
  return (
    <div
      className={`${
        isConcise ? "w-[70px]" : "w-[160px]"
      } h-[35px] flex justify-center`}
    >
      <img
        src={isConcise ? confiableLogoSm : confiableLogo}
        alt="Cost Mate Logo"
        className="h-full"
      />
    </div>
  );
}
