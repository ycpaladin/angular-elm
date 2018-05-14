import { Action } from '@ngrx/store';
import { Category, Shop } from '../models';

export enum HomeActionTypes {
    LOAD_DATA_SUCESS = '[Order Home] LOAD_DATA_SUCESS',
    LOAD_DATA_FAIL = '[Order Home] LOAD_DATA_FAIL'
}


export class LoadDataSucess implements Action {
    readonly type = HomeActionTypes.LOAD_DATA_SUCESS;
    constructor(public categories: Category[], public shopList: Shop[]) { }
}

export class LoadDataFail implements Action {
    readonly type = HomeActionTypes.LOAD_DATA_FAIL;
    constructor(public message: string) { }
}


export type Actions = LoadDataSucess | LoadDataFail;

