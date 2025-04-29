import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usegetUser } from "../hooks/useGetuser";

export function EditUser() {
  const passwordref = useRef<HTMLInputElement>(null);
  const firstnameref = useRef<HTMLInputElement>(null);
  const lastnameref = useRef<HTMLInputElement>(null);
  const { lastname, username, getusername } = usegetUser();

  getusername();

  const navigate = useNavigate();

  async function update() {
    const password = passwordref.current?.value.trim();
    const firstname = firstnameref.current?.value.trim();
    const lastname = lastnameref.current?.value.trim();
    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:3000/api/v1/update",
      {
        password,
        firstname,
        lastname,
      },
      { headers: { token: token } }
    );

    navigate("/dashboard");
  }

  return (
    <div className="w-full h-screen bg-slate-950 flex-col items-center justify-center">
      <div className="bg-slate-950    w-full flex h-full justify-center ">
        <div className="bg-white px-8 py-4 pb-8 mt-32   flex flex-col rounded-md h-fit w-80">
          <div className=" flex justify-center items-center mb-1 font-bold  text-3xl">
            <div className="m-1">
              <div className="flex justify-center items-center">Edit User</div>
              <div className="text-sm mt-1 font-light flex justify-center items-center text-center">
                Update your details
              </div>
            </div>
          </div>

          <div className="text-slate-900 font-medium ml-1">firstname</div>
          <input
            type="text"
            placeholder="firstname..."
            ref={firstnameref}
            defaultValue={username}
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <div className="text-slate-900 font-medium ml-1">lastname</div>
          <input
            type="text"
            ref={lastnameref}
            defaultValue={lastname}
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <div className="text-slate-900 font-medium ml-1">password</div>
          <input
            type="password"
            placeholder="password..."
            ref={passwordref}
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <button
            onClick={() => {
              update();
            }}
            className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-3.5 cursor-pointer hover:bg-slate-800 "
          >
            Confirm
          </button>
          <div className="text-center mt-2">
            <a className="text-blue-500" href="http://localhost:5173/dashboard">
              Back to dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
