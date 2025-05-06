import { HistoryIcon } from "../icons/history";

export function BalanceCard() {
  return (
    <div className="bg-white p-5   mt-10 mr-20 ml-20 rounded-md flex justify-between items-center ">
      <div>
        <div className="text-2xl text-gray-800 font-medium mb-1">
          Your Balance
        </div>
        <div className="text-4xl font-bold text-blue-600">1230.09$</div>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="text-xl font-medium text-slate-600">
          <span className="cursor-pointer hover:text-slate-950">
            Transaction History
          </span>
        </div>
        <div>
          <HistoryIcon />
        </div>
      </div>
    </div>
  );
}
