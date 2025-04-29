import { useEffect, useState } from "react";
import { User } from "../components/user";
import { Adduser } from "../components/adduser";
import { usegetUser } from "../hooks/useGetuser";
import { useGetAccount } from "../hooks/useGetaccount";
import { useGetReciever } from "../hooks/useGetreciever";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../icons/editicon";

export function Dashboard() {
  const [adduserModelOpen, setadduserModelOpen] = useState(false);
  const { username, getusername } = usegetUser();
  const { balance, getbalance } = useGetAccount();
  const { recieverlist, getrecievers } = useGetReciever();
  const navigate = useNavigate();

  function logout() {
    navigate("/");
    localStorage.removeItem("token");
  }

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
      <div className="bg-white border-b-2 border-opacity-25 border-b-gray-300 w-full h-24 flex justify-between ">
        <Adduser
          open={adduserModelOpen}
          close={() => {
            setadduserModelOpen(false);
          }}
        />
        <div className="p-6 text-5xl text-blue-500 font-extrabold  ">Paytm</div>
        <div className="flex m-2 ">
          <div className="mr-7 mt-0.5 text-2xl font-bold flex items-center">
            <div>Hello, {username} </div>
            <div className="ml-1.5" onClick={() => navigate("/edituser")}>
              <EditIcon />
            </div>
          </div>
          <div className="mr-4 cursor-pointer flex    items-center">
            <div className="text-sm font-light mt-1">
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-slate-600 cursor-pointer py-1.5 px-3 rounded-md text-white"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-whit h-16  flex items-center p-6 text-2xl font-bold">
        Your Balance {balance}$
      </div>
      <div className="w-full h-full  bg-white  ">
        <div
          className="w-full h-14 p-2 mb-8 
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
        <div className=" h-9 flex items-center text-2xl border border-gray-300 rounded-md bg-blue-500  text-white font-bold p-6">
          Reciever List
        </div>
        {recieverlist &&
          recieverlist.map((reciever, index) => (
            <User
              key={index}
              username={reciever.recieverusername}
              firstname={reciever.recieverfirstname}
              lastname={reciever.recieverlastname}
            />
          ))}
      </div>
    </div>
  );
}
