import axios from "axios";
import { useState } from "react";

export function useGettransactions() {
  const [transactions, settransactions] = useState([]);

  const token = localStorage.getItem("token");

  async function gettransactions() {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/transactions",
      {
        headers: {
          token: token,
        },
      }
    );

    settransactions(response.data.history);
  }

  return { transactions, gettransactions };
}
