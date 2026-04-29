import { useIotaClientQuery } from "@iota/dapp-kit";
import { useMemo } from "react";
// Importujemy naszą nową funkcję "lądową"
import { getDeterministicCityCoord } from "../utils/geo";

export function useIotaValidators() {
  // Pobieramy dane o walidatorach z oficjalnego API IOTA
  const { data, isPending, error } = useIotaClientQuery("getLatestIotaSystemState");

  const validatorsData = useMemo(() => {
    // Sprawdzamy czy dane w ogóle do nas dotarły
    if (!data || !data.activeValidators) return [];

    return data.activeValidators.map((validator) => {
      // Używamy nowej funkcji, która przypisze walidatora do realnego miasta
      const coords = getDeterministicCityCoord(validator.name);

      return {
        id: validator.iotaAddress,
        name: validator.name,
        // Zamieniamy siłę głosu na czytelną liczbę
        stake: Number(validator.votingPower) / 1_000_000,
        lat: coords.lat,
        lng: coords.lng,
        color: "#ffffff", // Białe punkty dla walidatorów
      };
    });
  }, [data]);

  return { validators: validatorsData, isPending, error };
}
