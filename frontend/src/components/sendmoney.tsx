import { useNavigate } from "react-router-dom";

export function SendmoneyButtton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center p-4 mt-2">
      <button
        onClick={() => navigate(`/sendmoney2`)}
        className="bg-green-500 px-8 py-3 text-white font-medium text-xl rounded-lg cursor-pointer
        hover:bg-green-800"
      >
        Send Money
      </button>
    </div>
  );
}
