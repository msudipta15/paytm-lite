import { AdduserButton } from "../components/adduserbutton";
import { BalanceCard } from "../components/balancecard";
import { RecieverCard } from "../components/recievercard";
import { Topbar } from "../components/topbar";

export function Dashboard_new() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Topbar />
      <BalanceCard />
      <AdduserButton />
      <div className="mr-20 ml-20 mt-2 text-2xl font-medium">Receiver List</div>
      <RecieverCard />
    </div>
  );
}
