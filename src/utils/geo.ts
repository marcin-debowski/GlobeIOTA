// src/utils/geo.ts

// Lista głównych centrów danych / miast (Gwarantuje 100% lądu i realizm)
const TECH_HUBS = [
  { lat: 50.1109, lng: 8.6821 }, // Frankfurt, Niemcy (AWS)
  { lat: 40.7128, lng: -74.006 }, // Nowy Jork, USA
  { lat: 37.7749, lng: -122.4194 }, // San Francisco, USA
  { lat: 51.5074, lng: -0.1278 }, // Londyn, UK
  { lat: 1.3521, lng: 103.8198 }, // Singapur (GCP)
  { lat: 35.6895, lng: 139.6917 }, // Tokio, Japonia
  { lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
  { lat: 25.2048, lng: 55.2708 }, // Dubaj, ZEA
  { lat: -23.5505, lng: -46.6333 }, // Sao Paulo, Brazylia
  { lat: 52.2297, lng: 21.0122 }, // Warszawa, Polska (dla lokalnego smaczku!)
];

export function generateArcFromHash(hash: string) {
  let seed1 = 0,
    seed2 = 0;

  // Dzielimy hash na dwie połowy do wygenerowania startu i końca
  for (let i = 0; i < hash.length; i++) {
    if (i % 2 === 0) seed1 += hash.charCodeAt(i);
    else seed2 += hash.charCodeAt(i);
  }

  // Wybieramy miasto z listy na podstawie reszty z dzielenia
  const startHub = TECH_HUBS[seed1 % TECH_HUBS.length];
  const endHub = TECH_HUBS[seed2 % TECH_HUBS.length];

  // Dodajemy "szum" (jitter) +/- 2 stopnie, żeby transakcje
  // tworzyły chmurę wokół miasta, a nie idealną linię z 1 piksela
  const startJitterLat = (seed1 % 40) / 10 - 2;
  const startJitterLng = (seed2 % 40) / 10 - 2;
  const endJitterLat = (seed2 % 30) / 10 - 1.5;
  const endJitterLng = (seed1 % 30) / 10 - 1.5;

  return {
    startLat: startHub.lat + startJitterLat,
    startLng: startHub.lng + startJitterLng,
    endLat: endHub.lat + endJitterLat,
    endLng: endHub.lng + endJitterLng,
    color: "#10b981", // Szmaragdowy (zielony)
  };
}

// Eksportujemy też funkcję dla Walidatorów, żeby trzymali się lądu!
export function getDeterministicCityCoord(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);

  const hub = TECH_HUBS[hash % TECH_HUBS.length];
  const jitterLat = (hash % 20) / 10 - 1;
  const jitterLng = ((hash >> 2) % 20) / 10 - 1;

  return { lat: hub.lat + jitterLat, lng: hub.lng + jitterLng };
}
