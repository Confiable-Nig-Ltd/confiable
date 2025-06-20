import Logo from "../general/Logo";

export default function FormContainer({ title, subtitle, children }) {
  return (
    <div className="max-w-md w-full space-y-6 px-4 py-12 shadow-md rounded-xl border border-gray-200 bg-gray-100">
      <div className="flex flex-col items-center gap-2">
        <div className="mb-4 xl:hidden">
          <Logo isConcise={false} />
        </div>
        <h2 className="text-2xl self-start font-semibold text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center w-full">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
