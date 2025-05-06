import { Userfriendly } from "../icons/userfriendly";

export function FeatureCard3() {
  return (
    <div className="bg-white max-w-64 p-3 pb-6 flex flex-col justify-center h-64 text-center rounded-lg">
      <div className="text-blue-600 flex justify-center">
        <Userfriendly />
      </div>
      <div className="text-2xl  text-slate-900 p-1 font-medium">
        Easy to Use
      </div>
      <div className="text-slate-800">
        A simple interface to manage all your transactions effortlessly.
      </div>
    </div>
  );
}
