import axios from "axios";
import { useState } from "react";

export function usegetUser() {
  const [firstname, setfirstnamename] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");

  async function getusername() {
    const token = localStorage.getItem("token");
    const user = await axios.get("https://paytm-lite-backend.onrender.com/api/v1/user", {
      headers: {
        token: token,
      },
    });
    const firstname = user.data.user.firstname;
    const lastname = user.data.user.lastname;
    const email = user.data.user.email;

    setfirstnamename(firstname);
    setlastname(lastname);
    setemail(email);
  }

  return { firstname, email, lastname, getusername };
}
