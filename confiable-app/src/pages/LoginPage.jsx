import LoginForm from "../components/forms/Login";
import FormPage from "../components/forms/FormPage";
import confiableHero from '@/src/assets/confiableHero.png'

export default function LoginPage() {
  return (
    // <FormPage>
    //   <div className="flex h-full justify-center bg-[#1659d5]/40 gap-8 w-full min-h-screen items-center">
    //     <div className="h-100 w-180 rounded-xl bg-red-500"></div>
    //     <LoginForm />
    //   </div>
    // </FormPage>
    <div className="w-screen h-screen flex bg-[#324c7e]">
    {/* <div className="w-screen h-screen flex bg-[#1659D5]/40"> */}
      <div className="w-1/2 hidden xl:flex h-full py-8">
        <div className="rounded-lg w-9/10 max-w-[590px] mr-auto ml-6 h-full relative">
          <img src={confiableHero} alt="Confiable Nigeria Ltd" className="h-full rounded-lg w-full" />
          <div className="bg-gray-50/20 backdrop-blur-md rounded-b-lg absolute bottom-0 right-0 left-0 h-40 flex flex-col justify-center px-8 gap-4">
            <h2 className="text-white text-xl font-semibold">Track your spending and stay in control</h2>
            <p className="text-white text-sm">
              Consolidating Business Management - For Human Resources, Inventory and Financial Management . . .
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 w-full xl:w-1/2 h-full flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
