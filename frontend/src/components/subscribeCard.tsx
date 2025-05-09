import axios from "axios";
import { useRef } from "react";

export function SubscribeCard() {
  const inputref = useRef<HTMLInputElement>(null);

  async function subsribe() {
    const email = inputref.current?.value;

    try {
      const response = await axios.post(
        "https://paytm-lite-backend.onrender.com/api/v1/guest/subscribe",
        {
          email: email,
        }
      );
      alert(response.data.msg);
    } catch (error: any) {
      if (error.response?.data?.msg) {
        alert(error.response?.data?.msg);
      } else {
        alert("something went wrong ! please try again");
      }
    }
  }

  return (
    <div className="bg-blue-600 text-white w-full h-64 p-2 flex flex-col justify-center">
      <div className="text-center text-4xl font-bold ">
        Stay Updated with Paytm
      </div>
      <div className="text-center  text-xl mt-2">
        Subscribe to our newsletter for the latest updates and offers.
      </div>
      <div className="flex justify-center mt-8">
        <div>
          <input
            type="email"
            ref={inputref}
            placeholder="Enter your Email"
            className=" bg-white placeholder-gray-500 text-slate-950 rounded-l-lg w-96 py-2.5 px-6 hove"
          />
        </div>
        <div>
          <button
            onClick={() => subsribe()}
            className="px-6 py-2.5 bg-blue-800 rounded-r-lg cursor-pointer hover:bg-blue-950"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
