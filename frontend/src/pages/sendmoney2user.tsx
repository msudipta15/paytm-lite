import { useNavigate, useParams } from "react-router-dom";
import { LogoTopbar } from "../components/logoTopbar";
import { useRef, useState } from "react";
import axios from "axios";

export function SendMoney2user() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const amountref = useRef<HTMLInputElement>(null);

  async function sendmoney() {
    const token = localStorage.getItem("token");
    const reciever_email = email;
    const amount = amountref.current?.value;

    if (!amount) {
      seterror("Enter a amount !");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { email: reciever_email, amount: amount },
        { headers: { token: token } }
      );

      alert(`$${amount} send succesfully to ${reciever_email}`);
      navigate("/dashboard2");
    } catch (err: any) {
      if (err.response?.data?.msg) {
        seterror(err.response?.data?.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

  return (
    <div className="bg-gray-100 w-full h-screen">
      <LogoTopbar />
      <div className="flex justify-center h-full w-full">
        <div className="bg-white min-w-1/3 h-1/2 mt-10 rounded-lg">
          <div className="text-center text-3xl p-3 font-semibold text-blue-800">
            Transfer Money
          </div>
          <div className="text-center text-xl font-medium mb-4 text-gray-700">
            user
          </div>
          <div className="my-2 mx-10 flex justify-center gap-4 items-center">
            <div className="text-2xl font-medium  text-gray-600">
              Reciever :
            </div>
            <div className="text-2xl font-medium text-blue-500">{email}</div>
          </div>
          <div className="my-2 mx-10">
            <div className="text-lg font-medium mb-1 text-gray-600">Amount</div>
            <input
              type="number"
              placeholder="Enter amount in $"
              ref={amountref}
              className="px-5 py-2 w-full rounded-lg border border-gray-200"
            />
          </div>
          <div className="mx-10 my-2">
            <button
              onClick={() => sendmoney()}
              className="w-full bg-green-600 text-white py-2 text-xl font-medium  rounded-lg mt-4 cursor-pointer hover:bg-green-800"
            >
              Send
            </button>
          </div>
          <div className="text-center text-xl font-medium mt-4 text-red-600">
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}
