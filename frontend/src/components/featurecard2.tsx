import { SecureIcon } from "../icons/secureicon";

export function FeatureCard2() {
  return (
    <div className="bg-white max-w-64 p-3 pt-5 flex flex-col justify-center h-64 text-center rounded-lg">
      <div className="text-blue-600 flex justify-center">
        <SecureIcon />
      </div>
      <div className="text-2xl  text-slate-900 p-1 font-medium">
        Secure Transactions
      </div>
      <div className="text-slate-800">
        Your money and data are protected with top-notch security.
      </div>
    </div>
  );
}
