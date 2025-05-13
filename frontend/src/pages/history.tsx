import { LogoTopbar } from "../components/logoTopbar";
import { Transaction } from "../components/transaction";

export function History() {
  return (
    <div className="h-screen w-full bg-gray-100">
      <LogoTopbar />
      <div className="flex h-full flex-col mx-40 ">
        <div className="w-full h-20 bg-white my-3 flex items-center rounded-lg ">
          <div className="text-2xl ml-17 font-medium">Transaction History </div>
        </div>
        <div className="w-full  min-h-1/2 max-h-full bg-gray-50 px-5 py-5">
          <Transaction />
        </div>
      </div>
    </div>
  );
}
