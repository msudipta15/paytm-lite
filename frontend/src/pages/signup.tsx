import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const firstnameref = useRef<HTMLInputElement>(null);
  const lastnameref = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function signup() {
    const username = usernameref.current?.value.trim();
    const password = passwordref.current?.value.trim();
    const firstname = firstnameref.current?.value.trim();
    const lastname = lastnameref.current?.value.trim();

    if (!username || !password || !firstname || !lastname) {
      setError("All fields are required !");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/signup", {
        username,
        password,
        firstname,
        lastname,
      });

      navigate("/signin");
    } catch (err: any) {
      if (err.response?.data?.msg) {
        setError(err.response?.data?.msg);
      } else {
        setError("Something went wrong !");
      }
    }
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex-col items-center justify-center">
      <div className="bg-slate-950    w-full flex h-full justify-center ">
        <div className="bg-white px-8 py-4 pb-8 mt-32   flex flex-col rounded-md h-fit w-80">
          <div className=" flex justify-center items-center mb-1 font-bold  text-3xl">
            <div className="m-1">
              <div className="flex justify-center items-center">Sign up</div>
              <div className="text-sm mt-1 font-light flex justify-center items-center text-center">
                Enter your information to create an account
              </div>
            </div>
          </div>

          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              signup();
            }}
          >
            <div className="text-slate-900 font-medium ml-1">Username</div>
            <input
              placeholder={"username..."}
              ref={usernameref}
              className="p-1 m-1  border rounded-md border-slate-700 "
            />
            <div className="text-slate-900 font-medium ml-1">Password</div>
            <input
              type="text"
              placeholder="password..."
              ref={passwordref}
              className="p-1 m-1  border rounded-md border-slate-700"
            />
            <div className="text-slate-900 font-medium ml-1">Firstname</div>
            <input
              type="text"
              placeholder="firstname..."
              ref={firstnameref}
              className="p-1 m-1  border rounded-md border-slate-700"
            />
            <div className="text-slate-900 font-medium ml-1">Lastname</div>
            <input
              type="text"
              placeholder="lastname..."
              ref={lastnameref}
              className="p-1 m-1  border rounded-md border-slate-700"
            />
            <button
              type="submit"
              className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-3.5 cursor-pointer hover:bg-slate-800 "
            >
              Submit
            </button>
          </form>
          {error && (
            <div className="text-red-500 flex justify-center text-sm mt-2">
              {error}
            </div>
          )}

          <div className="text-center mt-2">
            Already have an account?{" "}
            <a className="text-blue-500" href="http://localhost:5173/signin">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
