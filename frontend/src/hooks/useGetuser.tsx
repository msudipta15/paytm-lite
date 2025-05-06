import axios from "axios";
import { useState } from "react";

export function usegetUser() {
  const [firstname, setfirstnamename] = useState("");

  async function getusername() {
    const token = localStorage.getItem("token");
    const user = await axios.get("http://localhost:3000/api/v1/user", {
      headers: {
        token: token,
      },
    });
    const firstname = user.data.user.firstname;
    setfirstnamename(firstname);
  }

  return { firstname, getusername };
}
