import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwrodref = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin() {
    const username = usernameref.current?.value;
    const password = passwrodref.current?.value;

    const response = await axios.post("http://localhost:3000/api/v1/signin", {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");
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
          <div className="text-slate-900 font-medium ml-1">username</div>
          <input
            type="text"
            placeholder="username..."
            ref={usernameref}
            className="p-1 m-1  border rounded-md border-slate-700 "
          />
          <div className="text-slate-900 font-medium ml-1">password</div>
          <input
            type="text"
            placeholder="password..."
            ref={passwrodref}
            className="p-1 m-1  border rounded-md border-slate-700"
          />

          <button
            onClick={() => {
              signin();
            }}
            className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-5"
          >
            Submit
          </button>
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
