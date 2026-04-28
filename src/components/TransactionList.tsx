import { useIotaTransactions } from "../hooks/useIotaTransactions";
export const TransactionList = () => {
  // Wywołujemy nasz własny, czysty hook
  const { data, isPending, error, isFetching } = useIotaTransactions();

  if (isPending) return <div style={{ padding: "20px" }}>Pobieranie danych...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Błąd: {error.message}</div>;

  return (
    <>
      {/* Prawa strona: Lista transakcji (docelowo przeniesiemy to do components/TransactionList.tsx) */}
      <div
        style={{
          width: "400px",
          padding: "20px",
          overflowY: "auto",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2>⚡ Strumień transakcji</h2>
        {isFetching && <p style={{ color: "#0284c7" }}>Odświeżam...</p>}

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data?.map((tx: any) => (
            <li
              key={tx.digest}
              style={{
                background: "#f4f4f9",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
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
