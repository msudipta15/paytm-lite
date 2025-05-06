import { useEffect } from "react";
import { AdduserButton } from "../components/adduserbutton";
import { BalanceCard } from "../components/balancecard";
import { RecieverCard } from "../components/recievercard";
import { SendmoneyButtton } from "../components/sendmoney";
import { Topbar } from "../components/topbar";
import { usegetUser } from "../hooks/useGetuser";
import { useGetAccount } from "../hooks/useGetaccount";
import { useNavigate } from "react-router-dom";
import { useGetReciever } from "../hooks/useGetreciever";

export function Dashboard_new() {
  const navigate = useNavigate();
  const { firstname, getusername } = usegetUser();
  const { balance, getbalance } = useGetAccount();
  const { recieverlist, getrecievers } = useGetReciever();

  useEffect(() => {
    getusername();
    getbalance();
    getrecievers();
  }, []);

  function logout() {
    navigate("/home");
    localStorage.removeItem("token");
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Topbar firstname={firstname} logout={logout} />
      <BalanceCard balance={balance} />
      <div className="flex justify-center">
        <AdduserButton />
        <SendmoneyButtton />
      </div>

      <div className="mr-20 ml-20 mt-2 text-2xl font-medium">Receiver List</div>
      {recieverlist &&
        recieverlist.map((r) => (
          <RecieverCard
            email={r.recieveremail}
            firstname={r.recieverfirstname}
            lastname={r.recieverlastname}
          />
        ))}
    </div>
  );
}
