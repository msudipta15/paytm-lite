import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const emailref = useRef<HTMLInputElement>(null);
  const passwrodref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function signin() {
    const email = emailref.current?.value;
    const password = passwrodref.current?.value;

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.msg) {
        seterror(err.response?.data?.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex-col items-center justify-center">
      <div className="bg-slate-950    w-full flex h-full justify-center ">
        <div className="bg-white px-8 py-8 mt-48    flex flex-col rounded-md h-fit w-80">
          <div className=" flex justify-center items-center mb-3 font-bold  text-3xl">
            <div>
              <div className="text-center">Sign in</div>
              <div className="text-sm font-light text-center mt-1">
                Enter your credentials to access your account
              </div>
            </div>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              signin();
            }}
          >
            <div className="text-slate-900 font-medium ml-1">Email</div>
            <input
              type="email"
              placeholder="Enter your email"
              ref={emailref}
              className="p-1 m-1  border rounded-md border-slate-700 "
            />
            <div className="text-slate-900 font-medium ml-1">Password</div>
            <input
              type="password"
              placeholder="Enter your password"
              ref={passwrodref}
              className="p-1 m-1  border rounded-md border-slate-700"
            />

            <button
              type="submit"
              className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-5"
            >
              Submit
            </button>
          </form>
          {error && (
            <div className="flex justify-center mt-1 text-red-500 font-medium">
              {error}
            </div>
          )}
          <div className="text-center">
            Don't have an account?
            <a className="text-blue-500" href="http://localhost:5173/signup">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
