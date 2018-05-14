export interface City {
  pinyin: string;
  is_map: boolean;
  longitude: number;
  latitude: number;
  sort: number;
  area_code: string;
  abbr: string;
  name: string;
  id: number;
}


export interface CityGroup {
  [key: string]: City[];
}


export interface LocalStoreageCity {
  id?: number;
  key: string;
  cities: City[];
}
