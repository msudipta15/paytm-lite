import { useNavigate } from "react-router-dom";
import { HistoryIcon } from "../icons/history";

interface type {
  balance: Number;
}

export function BalanceCard({ balance }: type) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5   mt-10 mr-20 ml-20 rounded-md flex justify-between items-center ">
      <div>
        <div className="text-2xl text-gray-800 font-medium mb-1">
          Your Balance
        </div>
        <div className="text-4xl font-bold text-blue-600">{`${balance}`}$</div>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="text-xl font-medium text-slate-600">
          <span
            onClick={() => navigate("/history")}
            className="cursor-pointer hover:text-slate-950"
          >
            Transaction History
          </span>
        </div>
        <div onClick={() => navigate("/history")} className="w-fit h-fit">
          <HistoryIcon />
        </div>
      </div>
    </div>
  );
}
