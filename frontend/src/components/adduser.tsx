import { useRef } from "react";
import { CrossIcon } from "../icons/cross";
import axios from "axios";

export function Adduser({ open, close }: { open: boolean; close: () => void }) {
  const recieverref = useRef<HTMLInputElement>(null);

  async function addreciever() {
    const username = recieverref.current?.value;
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/v1/addreciever",
      { username },
      { headers: { token: token } }
    );
    alert("Reciever Added");
    close();
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

          <div className="flex justify-center mt-3  text-3xl font-bold">
            Add User
          </div>
          <div className="text-sm font-medium text-center">
            Enter username of the reciever
          </div>
          <div className="flex justify-center p-3">
            {" "}
            <input
              placeholder="username..."
              ref={recieverref}
              className="p-2 px-3 w-full mx-4 border border-gray-300 border-opacity-25 rounded-md"
              type="text"
            />
          </div>
          <div className="flex justify-center">
            {" "}
            <button
              onClick={() => addreciever()}
              className="bg-blue-600 cursor-pointer rounded-md px-3.5 py-2.5 mt-1 text-white"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    )
  );
}
