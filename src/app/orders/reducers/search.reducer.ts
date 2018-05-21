import { SearchHistory, SearchItem } from '../models';
import { Actions, OrderSearchActionTypes } from '../actions/search.action';


export interface State {
  // isFetching: boolean;
  // error: boolean;
  // message?: string;
  searchHistory?: SearchHistory[];
  searchResult?: SearchItem[];
}

export const initialStata: State = {
  // isFetching: false,
  // error: false
};


export function reducer(state: State = initialStata, action: Actions): State {
  switch (action.type) {
    // case OrderSearchActionTypes.CLEAR_SEARCH_HISTORY:
    // case OrderSearchActionTypes.LOAD_SEARCH_HISTORY:
    // case OrderSearchActionTypes.SEARCH_FETCHING:
    //     return Object.assign({}, state, {
    //         isFetching: true,
    //         error: false,
    //         message: undefined
    //     });
    case OrderSearchActionTypes.LOAD_SEARCH_HISTORY_SUCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        searchHistory: action.history
      });
    case OrderSearchActionTypes.SEARCH_SUCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        searchResult: action.data
      });
    // case OrderSearchActionTypes.CLEAR_SEARCH_HISTORY_FAIL:
    // case OrderSearchActionTypes.LOAD_SEARCH_HISTORY_FAIL:
    // case OrderSearchActionTypes.SEARCH_FAIL:
    // case OrderSearchActionTypes.DELETE_SEARCH_HISTORY_FAIL:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //         error: true,
    //         message: action.message
    //     });
    default:
      return state;
  }
}

// export const getIsFetching = (state: State) => state.isFetching;
// export const getError = (state: State) => state.error;
// export const getMessage = (state: State) => state.message;
export const getSearchResult = (state: State) => state.searchResult;
export const getSearchHistory = (state: State) => state.searchHistory;
