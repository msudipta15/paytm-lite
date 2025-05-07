import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin2() {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function signin() {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;

    if (!email || !password) {
      seterror("All fields are required !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error: any) {
      if (error.response.data.msg) {
        seterror(error.response.data.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="bg-white   p-4 py-5 flex justify-between items-center">
        <div className=" font-bold text-4xl pl-20 text-blue-600">
          <a href="http://localhost:5173">Paytm</a>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white w-md max-h-full mt-25 p-4 rounded-lg">
          <div className="text-center text-2xl pt-5 mb-5 font-medium text-slate-900 ">
            Sign In to Paytm
          </div>
          <div>
            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">Email</div>
              <input
                type="email"
                ref={emailref}
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="ml-15 mr-15 mb-3">
              <div className="text-slate-700 font-medium pl-1 mb-1">
                Password
              </div>
              <input
                type="password"
                ref={passwordref}
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mt-4 mb-3 ">
              <button
                onClick={() => signin()}
                className="bg-blue-600 w-full px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-900  text-white font-medium text-lg"
              >
                Sign In
              </button>
            </div>
            {error && (
              <div className="text-center text-lg text-red-500 font-medium">
                {error}
              </div>
            )}
            <div className="ml-15 mr-15  mb-3 pb-5 text-center ">
              <span>Don't have an account? </span>
              <a href="http://localhost:5173/signup" className="text-blue-500">
                Create One
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
