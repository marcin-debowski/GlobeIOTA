import { useIotaTransactions } from "../hooks/useIotaTransactions";
export const TransactionList = () => {
  // Wywołujemy nasz własny, czysty hook
  const { data, isPending, error, isFetching } = useIotaTransactions();

  if (isPending) return <div className='p-5'>Pobieranie danych...</div>;
  if (error) return <div className='p-5 text-red-500'>Błąd: {error.message}</div>;

  return (
    <>
      {/* Prawa strona: Lista transakcji (docelowo przeniesiemy to do components/TransactionList.tsx) */}
      <div className='w-1/3 overflow-y-auto border-r border-[#ccc] p-5'>
        <h2>⚡ Strumień transakcji</h2>
        {isFetching && <p className='text-sky-600'>Odświeżam...</p>}

        <ul className='list-none p-0'>
          {data?.map((tx: any) => (
            <li key={tx.digest} className=' rounded-8 bg-[#f4f4f9] p-4 my-2'>
              <strong>Hash:</strong> {tx.digest.slice(0, 10)}... <br />
              <strong>Nadawca:</strong>{" "}
              {tx.sender?.address ? tx.sender.address.slice(0, 10) + "..." : "Brak"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
