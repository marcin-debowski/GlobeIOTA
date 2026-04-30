// src/hooks/useIotaValidators.ts
import { useIotaClientQuery } from "@iota/dapp-kit";
import { useMemo } from "react";
import { getHubForValidator } from "../utils/geo";

export function useIotaValidators() {
  const { data, isPending, error } = useIotaClientQuery("getLatestIotaSystemState");

  const clusteredValidators = useMemo(() => {
    if (!data || !data.activeValidators) return [];

    // Mapa, gdzie kluczem jest po prostu cityName (np. "Frankfurt")
    const clusters = new Map<
      string,
      { lat: number; lng: number; count: number; cityName: string; serverNames: string[] }
    >();

    data.activeValidators.forEach((validator) => {
      // Pobieramy idealny, środkowy punkt z naszej bazy
      const hub = getHubForValidator(validator.name);

      if (clusters.has(hub.cityName)) {
        // Miasto już istnieje, dodajemy 1 do licznika
        const existing = clusters.get(hub.cityName)!;
        existing.count += 1;
        existing.serverNames.push(validator.name);
      } else {
        // Nowe miasto, tworzymy wpis z licznikiem 1
        clusters.set(hub.cityName, {
          lat: hub.lat,
          lng: hub.lng,
          count: 1,
          cityName: hub.cityName,
          serverNames: [validator.name],
        });
      }
    });

    // Zwracamy tablicę do wyświetlenia na globusie
    return Array.from(clusters.values());
  }, [data]);

  return { validators: clusteredValidators, isPending, error };
}
