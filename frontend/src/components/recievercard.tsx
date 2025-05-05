import { DeleteIcon } from "../icons/deleteicon";
import { Personicon } from "../icons/personicon";

export function RecieverCard() {
  return (
    <div className="mr-20 ml-20 mt-3 bg-white rounded-md p-5 flex justify-between">
      <div className="flex items-center gap-5 pl-3">
        <div className="w-10 h-10  bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
          <Personicon />
        </div>
        <div className="text-xl font-medium ">Sudipta Mondal</div>
      </div>
      <div className="flex items-center">
        <div>
          <DeleteIcon />
        </div>
        <div>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
