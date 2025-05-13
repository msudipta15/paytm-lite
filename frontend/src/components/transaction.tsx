interface txn {
  type: string;
  user: string;
  amount: number;
  time: string;
}

export function Transaction({ type, user, amount, time }: txn) {
  return (
    <div className="w-full h-fit p-3 my-1 text-xl bg-white flex justify-between items-center rounded-lg">
      <div className="ml-10">
        {type === "Credit" ? (
          <div className="p-1 font-medium text-slate-900">
            You recieved ${amount} from {user}
          </div>
        ) : (
          <div className="p-1 font-medium text-slate-900">
            You sent ${amount} to {user}
          </div>
        )}
        <div className="text-sm text-gray-500 mb-1 italic ml-1">{time}</div>
      </div>
      {type && type === "Credit" ? (
        <div className="mr-10 text-green-600">Credit</div>
      ) : (
        <div className="mr-10 text-red-600">Debit</div>
      )}
    </div>
  );
}
