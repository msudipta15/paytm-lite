import axios from "axios";
import { useState } from "react";

export function usegetUser() {
  const [username, setusername] = useState("");
  const [lastname, setlastname] = useState("");

  async function getusername() {
    const token = localStorage.getItem("token");
    const user = await axios.get("http://localhost:3000/api/v1/user", {
      headers: {
        token: token,
      },
    });
    const firstname = user.data.user.firstname;
    const lastname = user.data.user.lastname;
    setusername(firstname);
    setlastname(lastname);
  }

  return { username, lastname, getusername };
}
