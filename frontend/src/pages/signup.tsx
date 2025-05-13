import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup2() {
  const emailref = useRef<HTMLInputElement>(null);
  const firstnameref = useRef<HTMLInputElement>(null);
  const lastnameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function signup() {
    const email = emailref.current?.value;
    const firstname = firstnameref.current?.value;
    const lastname = lastnameref.current?.value;
    const password = passwordref.current?.value;

    if (!email || !firstname || !lastname || !password) {
      seterror("All fields are required !");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/signup", {
        email,
        firstname,
        lastname,
        password,
      });
      navigate("/signin2");
    } catch (error: any) {
      if (error.response?.data?.msg) {
        seterror(error.response?.data?.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="bg-white   p-4 py-5 flex justify-between items-center">
        <div className=" font-bold text-4xl pl-20 text-blue-600">
          <div
            onClick={() => navigate("/")}
            className="h-fit w-fit cursor-pointer"
          >
            Paytm
          </div>
        </div>
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
                ref={emailref}
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
                ref={firstnameref}
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
                ref={lastnameref}
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
                ref={passwordref}
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="ml-15 mr-15 mt-4 mb-3 ">
              <button
                onClick={() => signup()}
                className="bg-blue-600 w-full px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-900  text-white font-medium text-lg"
              >
                Sign Up
              </button>
            </div>
            {error && (
              <div className="text-center text-lg text-red-500 font-medium">
                {error}
              </div>
            )}
            <div className="ml-15 mr-15  mb-3 text-center flex justify-center gap-1 ">
              <div>Already have an account? </div>
              <div
                onClick={() => navigate("/signin")}
                className="text-blue-500 w-fit h-fit cursor-pointer hover:text-blue-700"
              >
                Sign in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
