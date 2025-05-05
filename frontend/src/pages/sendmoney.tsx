import { useNavigate, useParams } from "react-router-dom";

import { useRef, useState } from "react";
import axios from "axios";

export function Sendmoney() {
  const { email } = useParams<{ email: string }>();
  const amountref = useRef<HTMLInputElement>(null);

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function sendmoney() {
    const token = localStorage.getItem("token");
    const reciever_email = email;
    const amount = amountref.current?.value;

    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { email: reciever_email, amount: amount },
        { headers: { token: token } }
      );

      alert(`$${amount} send succesfully to ${reciever_email}`);
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
    <div className="h-screen w-full bg-slate-950 flex justify-center items-center">
      <div className="bg-white h-72 w-1/4 rounded-md p-4">
        <div className="text-3xl  text-center font-bold flex  justify-center items-center">
          <div>Send Money</div>
        </div>
        <div className="flex justify-center p-1 items-center  text-xl ">
          <div className="ml-0.5 text-xl text-blue-600">{email}</div>
        </div>
        <div>
          <div className="text-gray-600 mt-1">Amount (in Usd):</div>
          <div className="w-full">
            <input
              type="number"
              ref={amountref}
              placeholder="Enter amount "
              className="p-2 w-full border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <button
            onClick={() => sendmoney()}
            className="px-8 py-2 rounded-md cursor-pointer text-white bg-green-500"
          >
            Send
          </button>
        </div>
        {error && (
          <div className="flex justify-center mt-1 text-red-600 font-medium">
            {error}
          </div>
        )}
        <div className="flex justify-center items-center mt-1 ">
          <div
            className=" text-gray-500 cursor-pointer mt-1"
            onClick={() => navigate("/dashboard")}
          >
            <span className="hover:text-slate-950">Back to Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
