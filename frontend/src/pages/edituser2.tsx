import { useEffect } from "react";
import { LogoTopbar } from "../components/logoTopbar";
import { usegetUser } from "../hooks/useGetuser";

export function Edituser2() {
  const { email, firstname, lastname, getusername } = usegetUser();

  useEffect(() => {
    getusername();
  }, []);

  return (
    <div className="h-screen w-full bg-gray-100">
      <LogoTopbar />

      <div className="flex justify-center">
        <div className="bg-white w-lg max-h-full mt-15 p-4 rounded-lg">
          <div className="text-center text-2xl mb-5 font-medium text-slate-900">
            Edit Account
          </div>
          <div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="text"
                value={email}
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">
                First Name
              </div>
              <input
                type="text"
                defaultValue={firstname}
                placeholder="Enter your first name"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">
                Last Name
              </div>
              <input
                type="text"
                defaultValue={lastname}
                placeholder="Enter your last name"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">
                Password
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mt-4 mb-3 ">
              <button className="bg-blue-600 w-full px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-900  text-white font-medium text-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
