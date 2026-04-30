import { useIotaClientQuery } from "@iota/dapp-kit";
import { useMemo } from "react";
import { getHubForValidator } from "../utils/geo";

export function useIotaValidators() {
  const { data, isPending, error } = useIotaClientQuery("getLatestIotaSystemState");

  const clusteredValidators = useMemo(() => {
    if (!data || !data.activeValidators) return [];

    const clusters = new Map<
      string,
      { lat: number; lng: number; count: number; cityName: string; serverNames: string[] }
    >();

    data.activeValidators.forEach((validator) => {
      const hub = getHubForValidator(validator.name);

      if (clusters.has(hub.cityName)) {
        const existing = clusters.get(hub.cityName)!;
        existing.count += 1;
        existing.serverNames.push(validator.name);
      } else {
        clusters.set(hub.cityName, {
          lat: hub.lat,
          lng: hub.lng,
          count: 1,
          cityName: hub.cityName,
          serverNames: [validator.name],
        });
      }
    });

    return Array.from(clusters.values());
  }, [data]);

  return { validators: clusteredValidators, isPending, error };
}
