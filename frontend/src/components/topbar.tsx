import { EditIcon } from "../icons/editicon";

export function Topbar() {
  return (
    <div className="bg-blue-600 text-white p-4 py-5 flex justify-between items-center">
      <div className=" font-semibold text-4xl pl-20">Paytm</div>
      <div className="flex gap-4 items-center font-medium">
        <div className=" text-xl">Hello name</div>
        <div>
          <EditIcon />
        </div>
        <div className="pl-15 pr-20">
          <button className="px-6 py-2 bg-blue-500 cursor-pointer rounded-md text-white font-medium hover:bg-blue-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
