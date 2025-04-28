import { useEffect, useState } from "react";
import { User } from "../components/user";
import { Usericon } from "../icons/usericon";
import { Adduser } from "../components/adduser";
import { Searchuser } from "../components/searchuser";
import { usegetUser } from "../hooks/useGetuser";
import { useGetAccount } from "../hooks/useGetaccount";
import { useGetReciever } from "../hooks/useGetreciever";

export function Dashboard() {
  const [adduserModelOpen, setadduserModelOpen] = useState(false);
  const { username, getusername } = usegetUser();
  const { balance, getbalance } = useGetAccount();
  const { recieverlist, getrecievers } = useGetReciever();

  useEffect(() => {
    getusername();
    getbalance();
    getrecievers();
  }, []);

  useEffect(() => {
    getrecievers();
  }, [adduserModelOpen]);

  return (
    <div className="h-screen w-full bg-white relative">
      <div className="bg-white border-b-2 border-opacity-25 border-b-gray-300 w-full h-24 flex justify-between items-center">
        <Adduser
          open={adduserModelOpen}
          close={() => {
            setadduserModelOpen(false);
          }}
        />
        <div className="p-6 text-5xl text-blue-500 font-extrabold items-center ">
          Paytm
        </div>
        <div className="flex m-2 ">
          <div className="mr-9 text-xl font-bold">Hello, {username} </div>
          <div className="mr-4 cursor-pointer">
            <Usericon />
          </div>
        </div>
      </div>
      <div className="bg-white h-20 flex items-center p-6 text-2xl font-bold">
        Your Balance {balance}$
      </div>
      <div className="bg-white h-9 flex items-center text-2xl font-bold p-6">
        Users
      </div>
      <Searchuser />
      <div className="w-full h-full  bg-white mt-2 p-4">
        <div
          className="w-full h-14 p-2 mb-2 
             flex justify-center items-center"
        >
          <button
            onClick={() => {
              setadduserModelOpen(true);
            }}
            className="bg-blue-600 py-2.5 px-3 cursor-pointer rounded-md text-white"
          >
            Add Reciever
          </button>
        </div>
        {recieverlist.map((reciever) => (
          <User
            firstname={reciever.recieverfirstname}
            lastname={reciever.recieverlastname}
          />
        ))}
      </div>
    </div>
  );
}
