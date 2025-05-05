import { useNavigate } from "react-router-dom";
import { Personicon } from "../icons/personicon";
import { DeleteIcon } from "../icons/deleteicon";
import axios from "axios";
import { useState } from "react";

export function User({
  email,
  firstname,
  lastname,
}: {
  email: String;
  firstname: String;
  lastname: String;
}) {
  const navigate = useNavigate();
  const [deleteuser, setdeleteuser] = useState(true);

  async function deletereciever() {
    const token = localStorage.getItem("token");
    await axios.put(
      "http://localhost:3000/api/v1/deletereciever",
      { email },
      { headers: { token: token } }
    );
    setdeleteuser(false);
  }

  return (
    <div
      className={`${
        deleteuser
          ? "bg-white h-14 p-3 m-1 mb-2 flex justify-between items-center  rounded-md border-gray-200 border-opacity-25"
          : "hidden"
      }`}
    >
      <div className="flex items-center">
        <Personicon />
        <span className="text-xl font-bold ml-2">
          {firstname} {lastname}
        </span>
      </div>
      <div className="flex items-center">
        <div
          onClick={() => {
            deletereciever();
          }}
          className="mr-4"
        >
          <DeleteIcon />
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/sendmoney/${email}`);
            }}
            className="bg-green-600  text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
