import axios from "axios";
import { useState } from "react";

interface Iuser {
  email: String;
  firstname: String;
  lastname: String;
}
interface recieverlist {
  id: string;
  userid: string;
  recieverid: Iuser;
}

export function useGetReciever() {
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
