import { Personicon } from "../icons/personicon";

export function ReviewCrad1() {
  return (
    <div className="bg-white w-1/3  p-4 flex flex-col h-1/4  rounded-lg">
      <div className="mx-2 my-1 text-center ">
        <span className="text-lg font-medium  text-gray-600 italic">
          "Paytm has made sending money so easy! I love how fast and secure it
          is."
        </span>
      </div>
      <div className="flex mx-2 gap-5 my-3">
        <div className="mt-1">
          <Personicon />
        </div>
        <div>
          <p className="font-medium text-lg">Ankit Sharma</p>
          <p className="text-gray-600 text-sm">Freelancer</p>
        </div>
      </div>
    </div>
  );
}
