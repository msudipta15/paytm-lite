import { useNavigate } from "react-router-dom";

export function LogoTopbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white p-4 py-5 flex justify-between items-center">
      <div className=" font-semibold text-4xl pl-20">Paytm</div>
      <div className="pr-20 font-medium text-lg">
        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer hover:text-gray-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
