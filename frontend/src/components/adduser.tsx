import { useRef, useState } from "react";
import { CrossIcon } from "../icons/cross";
import axios from "axios";

export function Adduser({ open, close }: { open: boolean; close: () => void }) {
  const recieverref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  async function addreciever() {
    const email = recieverref.current?.value;
    const token = localStorage.getItem("token");

    try {
      if (!recieverref) {
        seterror("Add email of the user");
        return;
      }
      await axios.post(
        "https://paytm-lite-backend.onrender.com/api/v1/addreciever",
        { email },
        { headers: { token: token } }
      );
      close();
    } catch (err: any) {
      if (err.response?.data?.msg) {
        seterror(err.response?.data?.msg);
      } else {
        seterror("Something went wrong");
      }
    }
  }

  return (
    open && (
      <div className="bg-slate-600/70  h-screen w-screen flex justify-center items-center fixed top-0 ">
        <div className="bg-white h-1/3 w-1/4 flex flex-col rounded-lg justify-center items-center">
          <div className=" w-full pr-16 flex justify-end">
            <div
              className=" w-fit cursor-pointer ml-2 flex justify-end"
              onClick={() => close()}
            >
              <CrossIcon />
            </div>
          </div>

          <div className="flex justify-center  text-3xl font-bold">
            Add Reciever
          </div>
          <div className="text-sm font-medium text-center">
            Enter email of the reciever
          </div>
          <div className="flex justify-center p-3 w-full px-8">
            {" "}
            <input
              placeholder="Enter email "
              ref={recieverref}
              className="p-2 px-6 w-full border border-gray-300 border-opacity-25 rounded-md"
              type="email"
            />
          </div>
          <div className="flex justify-center">
            {" "}
            <button
              onClick={() => addreciever()}
              className="bg-blue-600 cursor-pointer rounded-md px-10 py-2 mt-1 font-medium text-lg text-white hover:bg-blue-800"
            >
              Add
            </button>
          </div>
          {error && (
            <div className="flex mt-2 justify-center text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  );
}
