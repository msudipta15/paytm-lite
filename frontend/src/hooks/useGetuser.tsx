import axios from "axios";
import { useEffect, useState } from "react";

export function useGetuser() {
  const [recievers, setreciever] = useState([]);
  async function recieverlist() {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/v1/reciever", {
      headers: { token: token },
    });
    const reciever = response.data.reciever;
    setreciever(reciever);
    console.log(reciever);
  }

  useEffect(() => {
    recieverlist();
  }, []);

  return { recieverlist, recievers };
}
