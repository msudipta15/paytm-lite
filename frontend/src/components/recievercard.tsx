import { DeleteIcon } from "../icons/deleteicon";
import { Personicon } from "../icons/personicon";

interface reciever {
  email: String;
  firstname: String;
  lastname: String;
}

export function RecieverCard({ email, firstname, lastname }: reciever) {
  return (
    <div className="mr-20 ml-20 mt-3 bg-white rounded-md p-5 flex justify-between">
      <div className="flex items-center gap-5 pl-3">
        <div className="w-10 h-10  bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
          <Personicon />
        </div>
        <div className="text-xl font-medium ">
          {firstname} {lastname}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="mt-1">
          <DeleteIcon />
        </div>
        <div>
          <button className="bg-green-500 px-5 py-1 text-white rounded-lg font-medium text-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
