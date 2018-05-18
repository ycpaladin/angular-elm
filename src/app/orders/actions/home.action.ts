import { Action } from '@ngrx/store';
import { Category, Shop } from '../models';

export enum HomeActionTypes {
  LOAD_HOME_DATA = '[Order Home] LOAD_HOME_DATA',
  LOAD_HOME_DATA_SUCESS = '[Order Home] LOAD_HOME_DATA_SUCESS',
  LOAD_HOME_DATA_FAIL = '[Order Home] LOAD_HOME_DATA_FAIL'
}

export class LoadHomeData implements Action {
  readonly type = HomeActionTypes.LOAD_HOME_DATA;
  constructor(public geohash: string) { }
}

export class LoadHomeDataSucess implements Action {
  readonly type = HomeActionTypes.LOAD_HOME_DATA_SUCESS;
  constructor(public categories: Category[], public shopList: Shop[]) { }
}

export class LoadHomeDataFail implements Action {
  readonly type = HomeActionTypes.LOAD_HOME_DATA_FAIL;
  constructor(public message: string) { }
}


export type Actions = LoadHomeData | LoadHomeDataSucess | LoadHomeDataFail;

