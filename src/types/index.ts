export interface IotaTransaction {
  digest: string;
  sender?: {
    address: string;
  };
  effects?: {
    status: string;
  };
}

export interface ValidatorCluster {
  lat: number;
  lng: number;
  count: number;
  cityName: string;
  serverNames: string[];
}

export interface TransactionArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}
