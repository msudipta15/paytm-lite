import axios from "axios";
import {  useState } from "react";

export function useGetReciever() {
  interface recieverlist {
    id: string;
    userid: string;
    recieverid: string;
    recieverusername: string;
    recieverfirstname: string;
    recieverlastname: string;
  }

  const [recieverlist, setrecieverlist] = useState<recieverlist[]>([]);

  async function getrecievers() {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/v1/reciever", {
      headers: { token: token },
    });
    const recievers = response.data.reciever;
    setrecieverlist(recievers);
  }


  return { recieverlist, getrecievers };
}
