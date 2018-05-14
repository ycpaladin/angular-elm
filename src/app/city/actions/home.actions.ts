import { Action } from '@ngrx/store';
import { City, CityGroup } from '../models/home';

export enum HomeActionTypes {
  LOAD_CITY_DATA = '[HOME] LOAD_CITY_DATA',
  LOAD_CITY_DATA_SUCESS = '[HOME] LOAD_CITY_DATA_SUCESS',
  LOAD_CITY_DATA_FAIL = '[HOME] LOAD_CITY_DATA_FAIL',
  CHANGE_CITY = '[HOME] CHANGE_CITY'
}


export class LoadCityData implements Action {
  readonly type = HomeActionTypes.LOAD_CITY_DATA;
  constructor() { }
}

export class LoadCityDataSucess implements Action {
  readonly type = HomeActionTypes.LOAD_CITY_DATA_SUCESS;
  constructor(public data: { guess: City, hot: City[], group: CityGroup }) { }
}

export class LoadCityDataFail implements Action {
  readonly type = HomeActionTypes.LOAD_CITY_DATA_FAIL;
  constructor(public message: string) { }
}

export class ChangeCity implements Action {
  readonly type = HomeActionTypes.CHANGE_CITY;
  constructor(public id: string) {

  }
}


export type Actions = LoadCityData | LoadCityDataSucess | LoadCityDataFail | ChangeCity;


