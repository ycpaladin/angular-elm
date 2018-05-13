import { Action } from '@ngrx/store';
import { CityHistory } from '../models/city';

export enum CityEnum {
    // SEARCH_POSITION = '[CITY] SEARCH_POSITION',
    // SEARCH_POSITION_SUCESS = '[CITY] SEARCH_POSITION_SUCESS',
    // SEARCH_POSITION_FAIL = '[CITY] SEARCH_POSITION_FAIL',
    GET_SEARCH_HISTORY_LIST = '[CITY] GET_SEARCH_HISTORY_LIST',
    GET_SEARCH_HISTORY_LIST_SUCESS = '[CITY] GET_SEARCH_HISTORY_LIST_SUCESS',
    CLEAR_SEARCH_HISTORY = '[CITY] CLEAR_SEARCH_HISTORY'
}


export class GetSearchHistoryList implements Action {
    readonly type = CityEnum.GET_SEARCH_HISTORY_LIST;
    constructor() {

    }
}


export class GetSearchHistoryListSucess implements Action {
    readonly type = CityEnum.GET_SEARCH_HISTORY_LIST_SUCESS;
    constructor(public data: CityHistory[]) { }
}


export class ClearhHistoryList implements Action {
    readonly type = CityEnum.CLEAR_SEARCH_HISTORY;
    constructor() {

    }
}

export type Actions = GetSearchHistoryList | GetSearchHistoryListSucess | ClearhHistoryList;

