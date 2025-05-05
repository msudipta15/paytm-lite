import axios from "axios";
import { useState } from "react";

export function useGetReciever() {
  interface recieverlist {
    id: string;
    userid: string;
    recieverid: string;
    recieveremail: string;
    recieverfirstname: string;
    recieverlastname: string;
  }

  const [recieverlist, setrecieverlist] = useState<recieverlist[]>([]);

  async function getrecievers() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/reciever",
        {
          headers: { token: token },
        }
      );
      const recievers = response.data.reciever;
      setrecieverlist(recievers);
    } catch (err) {
      console.log(err);
    }
  }

  return { recieverlist, getrecievers };
}
