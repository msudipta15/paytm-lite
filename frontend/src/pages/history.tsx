import { useEffect, useState } from "react";
import { LogoTopbar } from "../components/logoTopbar";
import { Transaction } from "../components/transaction";
import { useGettransactions } from "../hooks/useGettransactions";

interface txn {
  user: string;
  amount: number;
  type: string;
  time: string;
}

export function History() {
  const { transactions, gettransactions } = useGettransactions();
  const [filter, setfilter] = useState("All");

  useEffect(() => {
    gettransactions();
  }, []);

  const filtertransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t: txn) => t.type === filter);

  return (
    <div className="min-h-screen max-h-full w-full bg-gray-100">
      <LogoTopbar />
      <div className="flex h-full flex-col mx-40 ">
        <div className="w-full h-20 bg-white my-3 flex items-center rounded-lg ">
          <div className="text-2xl ml-14 w-full font-medium flex justify-between">
            <div>Transaction History</div>
            <div className="mr-14">
              <select
                name="Type"
                id="1"
                onChange={(e) => setfilter(e.target.value)}
                className="text-lg p-2 text-center px-3  font-medium text-slate-900 rounded-lg"
              >
                <option value="All">All Transactions</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
          </div>
        </div>

        {filtertransactions.length !== 0 ? (
          filtertransactions.map((t: txn) => (
            <Transaction
              type={t.type}
              user={t.user}
              amount={t.amount}
              time={t.time}
            />
          ))
        ) : (
          <div className="text-2xl text-center my-10">
            You do not have any transactions
          </div>
        )}
      </div>
    </div>
  );
}
