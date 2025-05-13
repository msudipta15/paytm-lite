import axios from "axios";
import { useState } from "react";

export function useGetAccount() {
  const [balance, setbalance] = useState(0);
  async function getbalance() {
    const token = localStorage.getItem("token");
    const account = await axios.get(
      "https://paytm-lite-backend.onrender.com/api/v1/account/balance",
      {
        headers: {
          token: token,
        },
      }
    );
    const balance = account.data.balance;
    setbalance(balance);
  }

  return { balance, getbalance };
}
