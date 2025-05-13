import { useEffect, useRef, useState } from "react";
import { LogoTopbar } from "../components/logoTopbar";
import { usegetUser } from "../hooks/useGetuser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Edituser2() {
  const navigate = useNavigate();

  const { email, firstname, lastname, getusername } = usegetUser();

  const passwordref = useRef<HTMLInputElement>(null);
  const firstnameref = useRef<HTMLInputElement>(null);
  const lastnameref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  useEffect(() => {
    getusername();
  }, []);

  async function update() {
    const password = passwordref.current?.value.trim();
    const firstname = firstnameref.current?.value.trim();
    const lastname = lastnameref.current?.value.trim();
    const token = localStorage.getItem("token");

    if (!password || !firstname || !lastname) {
      seterror("Inputs can not be Empty");
      return;
    }

    try {
      const response = await axios.put(
        "https://paytm-lite-backend.onrender.com/api/v1/update",
        {
          password,
          firstname,
          lastname,
        },
        { headers: { token: token } }
      );
      alert(response.data.msg);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.msg) {
        seterror(error.response?.data?.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

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
                defaultValue={lastname}
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
                onClick={() => update()}
                className="bg-blue-600 w-full px-5 py-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-900  text-white font-medium text-lg"
              >
                Submit
              </button>
            </div>
            {error && (
              <div className="p-1 text-center text-xl text-red-600 font-medium">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
