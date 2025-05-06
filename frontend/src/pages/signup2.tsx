import { HomeFooter } from "../components/homefooter";

export function Signup2() {
  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="bg-white   p-4 py-5 flex justify-between items-center">
        <div className=" font-bold text-4xl pl-20 text-blue-600">Paytm</div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white w-lg max-h-full mt-15 p-4 rounded-lg">
          <div className="text-center text-2xl mb-5 font-medium text-slate-900">
            Create Your Paytm Account
          </div>
          <div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mt-4 mb-3 ">
              <button className="bg-blue-600 w-full px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-900  text-white font-medium text-lg">
                Sign Up
              </button>
            </div>
            <div className="ml-15 mr-15  mb-3 text-center ">
              <span>Already have an account? </span>
              <a href="" className="text-blue-500">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <HomeFooter />
      </div>
    </div>
  );
}
