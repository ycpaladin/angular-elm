

export interface CityHistory {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    geohash: string;
}

export interface CityHistoryWithId extends CityHistory {
    id: number;
}

