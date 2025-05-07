import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "../icons/deleteicon";
import { Personicon } from "../icons/personicon";
import axios from "axios";
import { useState } from "react";

interface reciever {
  email: String;
  firstname: String;
  lastname: String;
}

export function RecieverCard({ email, firstname, lastname }: reciever) {
  const [deletecard, setdeletecard] = useState(false);

  const navigate = useNavigate();

  async function deleteuser() {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:3000/api/v1/deletereciever",
        { email },
        {
          headers: {
            token: token,
          },
        }
      );
      setdeletecard(true);
    } catch (error: any) {
      if (error.response?.data?.msg) {
        alert(error.response?.data?.msg);
      } else {
        alert("something went wrong");
      }
    }
  }

  return (
    <div
      className={
        deletecard
          ? "hidden"
          : "mr-20 ml-20 mt-3 bg-white rounded-md p-5 flex justify-between"
      }
    >
      <div className="flex items-center gap-5 pl-3">
        <div className="w-10 h-10  bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
          <Personicon />
        </div>
        <div className="text-xl font-medium ">
          {firstname} {lastname}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={() => deleteuser()} className="mt-1 h-fit w-fit">
          <DeleteIcon />
        </div>
        <div>
          <button
            onClick={() => navigate(`/sendmoney2user/${email}`)}
            className="bg-green-500 px-5 py-1 text-white rounded-lg cursor-pointer hover:bg-green-800 font-medium text-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
