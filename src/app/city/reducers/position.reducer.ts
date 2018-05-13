
import * as actions from '../actions/city.action';
import { CityHistory } from '../models/city';

export interface State {
    historyList?: CityHistory[];
    positionList?: any[];
}


const initialState: State = {

};


export function reducer(state: State = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.CityEnum.GET_SEARCH_HISTORY_LIST_SUCESS:
            return Object.assign({}, state, {
                historyList: action.data
            });
        case actions.CityEnum.CLEAR_SEARCH_HISTORY:
            return Object.assign({}, state, {
                historyList: undefined
            });
        default:
            return state;
    }
}

// export const getIsFetching = (state: State) => state.isFetching;
// export const getError = (state: State) => state.error;
// export const getMessage = (state: State) => state.message;
export const getHistory = (state: State) => state.historyList;
export const getPositionList = (state: State) => state.positionList;
// export { getIsFetching, getError, getMessage } from '../../../store';

