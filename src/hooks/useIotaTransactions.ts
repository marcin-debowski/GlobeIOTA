// src/hooks/useIotaTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { GRAPHQL_ENDPOINT, TRANSACTIONS_QUERY } from "../api/queries";

export function useIotaTransactions() {
  return useQuery({
    queryKey: ["iota-graphql-transactions"],
    queryFn: async () => {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: TRANSACTIONS_QUERY }),
      });

      if (!response.ok) throw new Error("Błąd sieci podczas pobierania GraphQL");
      const json = await response.json();
      return json.data.transactionBlocks.nodes;
    },
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });
}
