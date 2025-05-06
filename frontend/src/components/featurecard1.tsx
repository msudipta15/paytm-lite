import { Fastpayemnt } from "../icons/fastpaymenticon";

export function FeatureCard1() {
  return (
    <div className="bg-white max-w-64 p-3 flex flex-col justify-center h-64 text-center rounded-lg">
      <div className="text-blue-600 flex justify-center p-1 ">
        <Fastpayemnt />
      </div>
      <div className="text-2xl text-slate-900 p-1 font-medium">
        Fast Payments
      </div>
      <div className="text-slate-800">
        Send money instantly to anyone, anywhere, with just a few clicks.
      </div>
    </div>
  );
}
