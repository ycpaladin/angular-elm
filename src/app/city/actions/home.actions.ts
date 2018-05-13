import { Action } from '@ngrx/store';
import { City, CityGroup } from '../models/home';

export enum HomeActions {
    LOAD_CITY_DATA = '[HOME] LOAD_CITY_DATA',
    LOAD_CITY_DATA_SUCESS = '[HOME] LOAD_CITY_DATA_SUCESS',
    LOAD_CITY_DATA_FAIL = '[HOME] LOAD_CITY_DATA_FAIL',
}


export class LoadCityData implements Action {
    readonly type = HomeActions.LOAD_CITY_DATA;
    constructor() { }
}


export class LoadCityDataSucess implements Action {
    readonly type = HomeActions.LOAD_CITY_DATA_SUCESS;
    constructor(public data: { guess: City, hot: City[], group: CityGroup }) { }
}

export class LoadCityDataFail implements Action {
    readonly type = HomeActions.LOAD_CITY_DATA_FAIL;
    constructor(public message: string) { }
}


export type Actions = LoadCityData | LoadCityDataSucess | LoadCityDataFail;


