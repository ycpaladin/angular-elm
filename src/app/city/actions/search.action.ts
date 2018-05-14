import { Action } from '@ngrx/store';
import { CityHistory } from '../models/city';

export enum SearchActionTypes {
  SEARCH_POSITION = '[CITY] SEARCH_POSITION',
  SEARCH_POSITION_SUCESS = '[CITY] SEARCH_POSITION_SUCESS',
  SEARCH_POSITION_FAIL = '[CITY] SEARCH_POSITION_FAIL',
  CLEAR_SEARCH_POSITION = '[CITY] CLEAR_SEARCH_POSITION',
  GET_SEARCH_HISTORY_LIST = '[CITY] GET_SEARCH_HISTORY_LIST',
  GET_SEARCH_HISTORY_LIST_SUCESS = '[CITY] GET_SEARCH_HISTORY_LIST_SUCESS',
  CLEAR_SEARCH_HISTORY = '[CITY] CLEAR_SEARCH_HISTORY',
  CLEAR_SEARCH_HISTORY_SUCESS = '[CITY] CLEAR_SEARCH_HISTORY_SUCESS',
  CLEAR_SEARCH_HISTORY_FAIL = '[CITY] CLEAR_SEARCH_HISTORY_FAIL',
}

export class SearchPosition implements Action {
  readonly type = SearchActionTypes.SEARCH_POSITION;
  constructor(public keyword: string) { }
}

export class SearchPositionSucess implements Action {
  readonly type = SearchActionTypes.SEARCH_POSITION_SUCESS;
  constructor(public data: CityHistory[]) { }
}

export class SearchPositionFail implements Action {
  readonly type = SearchActionTypes.SEARCH_POSITION_FAIL;
  constructor(public message: string) { }
}

export class ClearSearchPosition implements Action {
  readonly type = SearchActionTypes.CLEAR_SEARCH_POSITION;
  constructor() { }
}

export class GetSearchHistoryList implements Action {
  readonly type = SearchActionTypes.GET_SEARCH_HISTORY_LIST;
  constructor() { }
}


export class GetSearchHistoryListSucess implements Action {
  readonly type = SearchActionTypes.GET_SEARCH_HISTORY_LIST_SUCESS;
  constructor(public data: CityHistory[]) { }
}


export class ClearHistoryList implements Action {
  readonly type = SearchActionTypes.CLEAR_SEARCH_HISTORY;
  constructor() {

  }
}

export class ClearHistoryListSucess implements Action {
  readonly type = SearchActionTypes.CLEAR_SEARCH_HISTORY_SUCESS;
  constructor() { }
}

export class ClearHistoryListFail implements Action {
  readonly type = SearchActionTypes.CLEAR_SEARCH_HISTORY_FAIL;
  constructor(public message: string) { }
}

export type Actions =
  SearchPosition | SearchPositionSucess | SearchPositionFail | ClearSearchPosition |
  GetSearchHistoryList | GetSearchHistoryListSucess | ClearHistoryList | ClearHistoryListSucess | ClearHistoryListFail;

