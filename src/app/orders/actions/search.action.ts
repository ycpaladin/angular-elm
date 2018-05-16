import { Action } from '@ngrx/store';
import { SearchHistory, SearchItem } from '../models';


export enum OrderSearchActionTypes {
    LOAD_SEARCH_HISTORY = '[ORDER SEARCH] LOAD_SEARCH_HISTORY',
    LOAD_SEARCH_HISTORY_SUCESS = '[ORDER SEARCH] LOAD_SEARCH_HISTORY_SUCESS',
    LOAD_SEARCH_HISTORY_FAIL = '[ORDER SEARCH] LOAD_SEARCH_HISTORY_FAIL',
    CLEAR_SEARCH_HISTORY = '[ORDER SEARCH] CLEAR_SEARCH_HISTORY',
    // CLEAR_SEARCH_HISTORY_SUCESS = '[ORDER SEARCH] CLEAR_SEARCH_HISTORY_SUCESS',
    CLEAR_SEARCH_HISTORY_FAIL = '[ORDER SEARCH] CLEAR_SEARCH_HISTORY_FAIL',
    SEARCH_FETCHING = '[ORDER SEARCH] FETCHING',
    SEARCH_SUCESS = '[ORDER SEARCH] SEARCH_SUCESS',
    SEARCH_FAIL = '[ORDER SEARCH] SEARCH_FAIL',
    DELETE_SEARCH_HISTORY = '[ORDER SEARCH] DELETE_SEARCH_HISTORY',
    DELETE_SEARCH_HISTORY_FAIL = '[ORDER SEARCH] DELETE_SEARCH_HISTORY_FAIL',
}

export class LoadSearchHistory implements Action {
    readonly type = OrderSearchActionTypes.LOAD_SEARCH_HISTORY;
    constructor() { }
}

export class LoadSearchHistorySucess implements Action {
    readonly type = OrderSearchActionTypes.LOAD_SEARCH_HISTORY_SUCESS;
    constructor(public history: SearchHistory[]) { }
}

export class LoadSearchHistoryFail implements Action {
    readonly type = OrderSearchActionTypes.LOAD_SEARCH_HISTORY_FAIL;
    constructor(public message: string) { }
}

export class ClearSearchHistory implements Action {
    readonly type = OrderSearchActionTypes.CLEAR_SEARCH_HISTORY;
    constructor() { }
}

export class DeleteSearchHistory implements Action {
    readonly type = OrderSearchActionTypes.DELETE_SEARCH_HISTORY;
    constructor(public id: number) { }
}

export class DeleteSearchHistoryFail implements Action {
    readonly type = OrderSearchActionTypes.DELETE_SEARCH_HISTORY_FAIL;
    constructor(public message: string) { }
}


// 清空成功就重新查询一次，
// export class ClearSearchHistorySucess implements Action {
//     readonly type = OrderSearchActionTypes.CLEAR_SEARCH_HISTORY_SUCESS;
//     constructor() { }
// }

export class ClearSearchHistoryFail implements Action {
    readonly type = OrderSearchActionTypes.CLEAR_SEARCH_HISTORY_FAIL;
    constructor(public message: string) { }
}

export class Search implements Action {
    readonly type = OrderSearchActionTypes.SEARCH_FETCHING;
    constructor(public keyword: string) { }
}

export class SearchSucess implements Action {
    readonly type = OrderSearchActionTypes.SEARCH_SUCESS;
    constructor(public data: SearchItem[]) { }
}

export class SearchFail implements Action {
    readonly type = OrderSearchActionTypes.SEARCH_FAIL;
    constructor(public message: string) { }
}



export type Actions = Search | SearchSucess | SearchFail |
    LoadSearchHistory | LoadSearchHistorySucess | LoadSearchHistoryFail |
    ClearSearchHistory | ClearSearchHistoryFail |
    DeleteSearchHistory | DeleteSearchHistoryFail; // ClearSearchHistorySucess |


