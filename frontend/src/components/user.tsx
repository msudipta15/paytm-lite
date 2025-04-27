import { Personicon } from "../icons/personicon";

export function User({
  firstname,
  lastname,
}: {
  firstname: String;
  lastname: String;
}) {
  return (
    <div className="bg-white h-14 p-3 m-1 mb-2 flex justify-between items-center border rounded-md border-gray-200 border-opacity-25">
      <div className="flex items-center">
        <Personicon />
        <span className="text-xl font-bold ml-2">
          {firstname} {lastname}
        </span>
      </div>
      <div>
        <button className="bg-green-600  text-white px-3 py-2 rounded-md cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
