import { useNavigate, useParams } from "react-router-dom";
import { Personicon } from "../icons/personicon";
import { useRef } from "react";
import axios from "axios";
import { Backicon } from "../icons/backicon";

export function Sendmoney() {
  const { username } = useParams<{ username: string }>();
  const amountref = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function sendmoney() {
    const token = localStorage.getItem("token");
    const reciever_username = username;
    const amount = amountref.current?.value;

    await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      { username: reciever_username, amount: amount },
      { headers: { token: token } }
    );

    alert(`$${amount} send succesfully to ${reciever_username}`);
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-full bg-slate-950 flex justify-center items-center">
      <div className="bg-white h-64 w-1/4 rounded-md p-4">
        <div className="text-3xl  text-center font-bold flex justify-center items-center">
          <div>Send Money</div>
        </div>
        <div className="flex justify-center p-1 items-center  text-xl ">
          <div className="mt-1 ">
            <Personicon />
          </div>
          <div className="ml-0.5 text-2xl">{username}</div>
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
        <div className="flex justify-center items-center mt-1 ">
          <div
            className="mt-1 text-gray-500 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </div>
          <div className="ml-2" onClick={() => navigate("/dashboard")}>
            <Backicon />
          </div>
        </div>
      </div>
    </div>
  );
}
