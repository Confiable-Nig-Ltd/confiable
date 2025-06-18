import Logo from "../general/Logo";

export default function FormContainer({ title, subtitle, children}) {
  return (
    <div className="max-w-md w-full mx-auto space-y-6 px-4 py-12 shadow-md rounded-xl border border-gray-200">
      <div className="flex flex-col items-center gap-2">
        <Logo isConcise={false} />
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
        <p className="text-gray-600 text-center w-full">
          {subtitle}
        </p>
      </div>
      { children }
    </div>
  );
}
