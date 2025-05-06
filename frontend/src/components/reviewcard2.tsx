import { Personicon } from "../icons/personicon";

export function ReviewCrad2() {
  return (
    <div className="bg-white w-1/3  p-4 flex flex-col h-1/4  rounded-lg">
      <div className="mx-2 my-1 text-center ">
        <span className="text-lg font-medium text-gray-600 italic">
          "The interface is so user-friendly, and I can add anyone and do
          transactions."
        </span>
      </div>
      <div className="flex mx-2 gap-5 my-3">
        <div className="mt-1">
          <Personicon />
        </div>
        <div>
          <p className="font-medium text-lg">Param Tiwari</p>
          <p className="text-gray-600 text-sm">Small Business Owner</p>
        </div>
      </div>
    </div>
  );
}
