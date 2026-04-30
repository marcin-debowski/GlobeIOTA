import { useState } from "react";
import { useIotaTransactions } from "../hooks/useIotaTransactions";
import type { IotaTransaction } from "../types";

export const TransactionList = () => {
  const { data, isPending, error, isFetching } = useIotaTransactions();
  const [open, setOpen] = useState(false);
  if (isPending) return <div className='p-5 bg-gray-950'>Pobieranie danych...</div>;
  if (error) return <div className='p-5 text-red-500'>Błąd: {error.message}</div>;

  return (
    <>
      <div
        className={`w-full border-r p-5 flex flex-col bg-none absolute bottom-0 ${open ? "h-1/3" : "h-35"} overflow-hidden cursor-pointer transition-all duration-300`}
      >
        <h2
          className='text-white font-bold text-xl mb-4 shrink-0'
          onClick={() => setOpen((o) => !o)}
        >
          Strumień {open ? "▼" : "▲"}
          {isFetching && <span className='text-emerald-400 ml-2'>Odświeżam...</span>}
        </h2>

        <ul className='list-none p-0 grid flex-1 min-h-0 overflow-y-auto grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2'>
          {data?.map((tx: IotaTransaction) => (
            <li
              key={tx.digest}
              className='rounded-8 bg-gray-950 border-gray-400 border p-4 rounded-xl shadow-2xl'
            >
              <strong className='text-emerald-400'>Hash:</strong>{" "}
              <span className='text-gray-400'>{tx.digest.slice(0, 10)}...</span> <br />
              <strong className='text-emerald-400'>Nadawca:</strong>{" "}
              <span className='text-gray-400'>
                {tx.sender?.address ? tx.sender.address.slice(0, 10) + "..." : "Brak"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
