export const TECH_HUBS = [
  { cityName: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { cityName: "Nowy Jork", lat: 40.7128, lng: -74.006 },
  { cityName: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { cityName: "Londyn", lat: 51.5074, lng: -0.1278 },
  { cityName: "Singapur", lat: 1.3521, lng: 103.8198 },
  { cityName: "Tokio", lat: 35.6895, lng: 139.6917 },
  { cityName: "Sydney", lat: -33.8688, lng: 151.2093 },
  { cityName: "Dubaj", lat: 25.2048, lng: 55.2708 },
  { cityName: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
  { cityName: "Warszawa", lat: 52.2297, lng: 21.0122 },
];

export function generateArcFromHash(hash: string) {
  let seed1 = 0,
    seed2 = 0;
  for (let i = 0; i < hash.length; i++) {
    if (i % 2 === 0) seed1 += hash.charCodeAt(i);
    else seed2 += hash.charCodeAt(i);
  }
  const startHub = TECH_HUBS[seed1 % TECH_HUBS.length];
  const endHub = TECH_HUBS[seed2 % TECH_HUBS.length];

  const startJitterLat = (seed1 % 40) / 10 - 2;
  const startJitterLng = (seed2 % 40) / 10 - 2;
  const endJitterLat = (seed2 % 30) / 10 - 1.5;
  const endJitterLng = (seed1 % 30) / 10 - 1.5;

  return {
    startLat: startHub.lat + startJitterLat,
    startLng: startHub.lng + startJitterLng,
    endLat: endHub.lat + endJitterLat,
    endLng: endHub.lng + endJitterLng,
    color: "#10b981",
  };
}

export function getHubForValidator(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);

  return TECH_HUBS[hash % TECH_HUBS.length];
}
