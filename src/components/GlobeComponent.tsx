// import Globe from "react-globe.gl";

// export const GlobeComponent = () => {
//   return <Globe arcsData={[]} width={600} height={600} />;
// };

// src/App.tsx

// Za chwilę zaimportujemy tu też <GlobeView />

function GlobeComponent() {
  return (
    <div
      style={{
        flex: 1,
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>TUTAJ BĘDZIE GLOBUS 3D 🌍</h2>
    </div>
  );
}
export default GlobeComponent;
//_____________________________________________________________________________________
//_____________________________________________________________________________________
//_____________________________________________________________________________________

// import { useIotaClientQuery } from "@iota/dapp-kit";
// import { useState, useEffect } from "react";

// function GlobeComponent() {
//   // Stan do śledzenia dokładnego czasu ostatniego odświeżenia
//   const [lastFetchTime, setLastFetchTime] = useState<string>("");

//   const { data, isPending, error, isFetching } = useIotaClientQuery(
//     "queryTransactionBlocks",
//     {
//       limit: 10,
//       order: "descending", // KLUCZOWE: Pobieramy od najnowszych transakcji w sieci!
//       options: {
//         showInput: true,
//         showEffects: true,
//       },
//     },
//     {
//       refetchInterval: 3000,
//       refetchIntervalInBackground: true, // Pozwala na odświeżanie, nawet gdy zminimalizujesz okno
//     },
//   );

//   // Aktualizujemy zegar za każdym razem, gdy React Query pobierze nowe dane
//   useEffect(() => {
//     if (!isFetching) {
//       setLastFetchTime(new Date().toLocaleTimeString());
//     }
//   }, [isFetching, data]);

//   if (isPending) {
//     return <div style={{ padding: "20px" }}>Łączenie z siecią IOTA i pobieranie transakcji...</div>;
//   }

//   if (error) {
//     return <div style={{ padding: "20px", color: "red" }}>Wystąpił błąd: {error.message}</div>;
//   }

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h2>🔥 Strumień transakcji IOTA</h2>

//       {/* Ten wskaźnik będzie migał / aktualizował się co 3 sekundy */}
//       <div
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           background: "#e0f2fe",
//           borderRadius: "5px",
//         }}
//       >
//         <strong>Ostatnie odpytanie sieci:</strong> {lastFetchTime || "Ładowanie..."}
//         {isFetching && (
//           <span style={{ marginLeft: "10px", color: "#0284c7" }}> (Pobieram nowe dane...)</span>
//         )}
//       </div>

//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {data?.data.map((tx) => (
//           <li
//             key={tx.digest}
//             style={{
//               background: "#f4f4f9",
//               margin: "10px 0",
//               padding: "15px",
//               borderRadius: "8px",
//               borderLeft: "5px solid #10b981",
//             }}
//           >
//             <strong>Hash (Digest):</strong> {tx.digest} <br />
//             <strong>Nadawca:</strong> {tx.transaction?.data.sender || "Brak danych"} <br />
//             <strong>Status:</strong>{" "}
//             {tx.effects?.status.status === "success" ? "✅ Sukces" : "❌ Błąd"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default GlobeComponent;

//_____________________________________________________________________________________
//_____________________________________________________________________________________
//_____________________________________________________________________________________

// import { useEffect } from "react";
// import Globe from "react-globe.gl";
// import { IotaClient, getFullnodeUrl } from "@iota/iota-sdk/client";

// const client = new IotaClient({
//   url: getFullnodeUrl("testnet"),
// });

// type OwnerShape =
//   | string
//   | { AddressOwner?: string; ObjectOwner?: string; Shared?: unknown; Immutable?: boolean }
//   | null
//   | undefined;

// const ownerToAddress = (owner: OwnerShape): string | null => {
//   if (!owner) return null;
//   if (typeof owner === "string") return owner;
//   if (typeof owner === "object") {
//     if (typeof owner.AddressOwner === "string") return owner.AddressOwner;
//     if (typeof owner.ObjectOwner === "string") return owner.ObjectOwner;
//   }
//   return null;
// };

// export const GlobeComponent = () => {
//   useEffect(() => {
//     let isActive = true;

//     const pollTransfers = async () => {
//       try {
//         const txPage = await client.queryTransactionBlocks({
//           order: "descending",
//           limit: 50,
//           options: {
//             showBalanceChanges: true,
//             showInput: true,
//           },
//         });

//         if (!isActive) {
//           return;
//         }

//         const transfers = txPage.data.map((tx) => {
//           const sender = tx.transaction?.data?.sender ?? null;
//           const recipients = Array.from(
//             new Set(
//               (tx.balanceChanges ?? [])
//                 .map((change) => ownerToAddress(change.owner as OwnerShape))
//                 .filter((address): address is string => Boolean(address && address !== sender)),
//             ),
//           );

//           return {
//             digest: tx.digest,
//             sender,
//             recipients,
//             timestampMs: tx.timestampMs,
//           };
//         });

//         console.log("IOTA live transfers:", transfers);
//       } catch (error) {
//         console.error("IOTA fetch error:", error);
//       }
//     };

//     void pollTransfers();

//     const intervalId = window.setInterval(() => {
//       void pollTransfers();
//     }, 5000);

//     return () => {
//       isActive = false;
//       window.clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <Globe
//       arcsData={[
//         { startLat: 120, endLat: 240, startLng: 340, endLng: 560 },
//         { startLat: 2400, endLat: 3600, startLng: 5600, endLng: 7800 },
//         { startLat: 36, endLat: 48, startLng: 78, endLng: 90 },
//       ]}
//       width={600}
//       height={600}
//     />
//   );
// };
