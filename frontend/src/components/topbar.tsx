import { useNavigate } from "react-router-dom";
import { EditIcon } from "../icons/editicon";

interface type {
  firstname: String;
  logout: () => void;
}

export function Topbar({ firstname, logout }: type) {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white p-4 py-5 flex justify-between items-center">
      <div className=" font-semibold text-4xl pl-20">Paytm</div>
      <div className="flex gap-4 items-center font-medium">
        <div className=" text-2xl">Hello , {firstname} </div>
        <div onClick={() => navigate(`/edituser`)} className="w-fit h-fit">
          <EditIcon />
        </div>
        <div className="pl-15 pr-20">
          <button
            onClick={() => logout()}
            className="px-6 py-2 bg-blue-500 cursor-pointer rounded-md text-white font-medium hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
