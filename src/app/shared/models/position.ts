export interface Position {
  address: string;
  city: string;
  geohash: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface PositionWithId extends Position {
  id: number;
}
