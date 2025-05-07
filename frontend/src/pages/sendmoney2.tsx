import { useEffect, useRef, useState } from "react";
import { LogoTopbar } from "../components/logoTopbar";
import { usegetUser } from "../hooks/useGetuser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SendMoney2() {
  const { email, getusername } = usegetUser();
  const navigate = useNavigate();
  const emailref = useRef<HTMLInputElement>(null);
  const amountref = useRef<HTMLInputElement>(null);
  const [error, seterror] = useState("");

  useEffect(() => {
    getusername();
  }, []);

  async function sendmoney() {
    const reciever_email = emailref.current?.value;
    const amount = amountref.current?.value;
    const token = localStorage.getItem("token");

    if (!reciever_email || !amount) {
      seterror("All fields are required !");
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
    } catch (error: any) {
      if (error.response?.data?.msg) {
        seterror(error.response?.data?.msg);
      } else {
        seterror("something went wrong");
      }
    }
  }

  return (
    <div className="bg-gray-100 w-full h-screen">
      <LogoTopbar />
      <div className="flex justify-center h-full w-full">
        <div className="bg-white w-1/3 h-1/2 mt-10 rounded-lg">
          <div className="text-center text-3xl p-3 font-semibold text-blue-800">
            Transfer Money
          </div>
          <div className="text-center text-xl font-medium mb-4 text-green-600">
            {email}
          </div>
          <div className="my-2 mx-10">
            <div className="text-lg font-medium mb-1 text-gray-600">
              Reciever Email
            </div>
            <input
              type="email"
              ref={emailref}
              placeholder="Enter reciever email"
              className="px-5 py-2 w-full rounded-lg border border-gray-200"
            />
          </div>
          <div className="my-2 mx-10">
            <div className="text-lg font-medium mb-1 text-gray-600">Amount</div>
            <input
              type="number"
              ref={amountref}
              placeholder="Enter amount"
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
