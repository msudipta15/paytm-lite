import axios from "axios";
import { useState } from "react";

export function usegetUser() {
  const [username, setusername] = useState("");

  async function getusername() {
    const token = localStorage.getItem("token");
    const user = await axios.get("http://localhost:3000/api/v1/user", {
      headers: {
        token: token,
      },
    });
    console.log(user);
    const firstname = user.data.user.firstname.toUpperCase();
    setusername(firstname);
  }

  return { username, getusername };
}
