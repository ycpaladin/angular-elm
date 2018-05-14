
import { SearchActionTypes, Actions } from '../actions/search.action';
import { CityHistory } from '../models/city';

export interface State {
  /**
   * 是否正在请求数据
   */
  isFetching: boolean;
  /**
   * 请求是否发生了错误
   */
  error: boolean;
  /**
   * 消息
   */
  message?: string;
  /**
   * 搜索历史
   */
  historyList?: CityHistory[];
  /**
   * 搜索结果
   */
  positionList?: CityHistory[];
}


const initialState: State = {
  isFetching: false,
  error: false
};


export function reducer(state: State = initialState, action: Actions) {
  switch (action.type) {
    case SearchActionTypes.SEARCH_POSITION:
    case SearchActionTypes.GET_SEARCH_HISTORY_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        message: ''
      });
    case SearchActionTypes.SEARCH_POSITION_SUCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        positionList: action.data
      });
    case SearchActionTypes.CLEAR_SEARCH_POSITION:
      return Object.assign({}, state, {
        positionList: undefined
      });
    case SearchActionTypes.GET_SEARCH_HISTORY_LIST_SUCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        historyList: action.data
      });
    case SearchActionTypes.SEARCH_POSITION_FAIL:
    case SearchActionTypes.CLEAR_SEARCH_HISTORY_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        message: action.message
      });
    case SearchActionTypes.CLEAR_SEARCH_HISTORY_SUCESS:
      return Object.assign({}, state, {
        historyList: undefined
      });

    default:
      return state;
  }
}

export const getIsFetching = (state: State) => state.isFetching;
export const getError = (state: State) => state.error;
export const getMessage = (state: State) => state.message;
// export const getHistory = (state: State) => state.historyList;
export const getPositionList = (state: State) =>
  state.positionList !== undefined && state.positionList.length > 0 ? state.positionList : state.positionList;
// export { getIsFetching, getError, getMessage } from '../../../store';

