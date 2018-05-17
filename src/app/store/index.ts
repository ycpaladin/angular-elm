// import { ActionReducerMap } from '@ngrx/store';
// // import * as homeActions from '../containers/home/store/actions';
// // import * as cityActions from '../containers/city/store/action';

// export interface State {
//     isFetching: boolean;
//     error: boolean;
//     message?: string;
// }

// const initialState: State = {
//     isFetching: false,
//     error: false,
// };

// export function reducer(state: State = initialState, action: any): State {
//     switch (action.type) {
//         // case homeActions.HomeActions.LOAD_CITY_DATA:
//         // case cityActions.CityEnum.GET_SEARCH_HISTORY_LIST:
//         //     return Object.assign({}, state, {
//         //         isFetching: true,
//         //         error: false,
//         //         message: undefined
//         //     });
//         // case homeActions.HomeActions.LOAD_CITY_DATA_SUCESS:
//         // case cityActions.CityEnum.GET_SEARCH_HISTORY_LIST_SUCESS:
//         //     return Object.assign({}, state, {
//         //         isFetching: false,
//         //         error: false,
//         //         message: undefined
//         //     });
//         // case homeActions.HomeActions.LOAD_CITY_DATA_FAIL:
//         //     return Object.assign({}, state, {
//         //         isFetching: false,
//         //         error: true,
//         //         message: action.message
//         //     });
//         default:
//             return state;
//     }
// }


// export const getIsFetching = (state: State) => state.isFetching;
// export const getError = (state: State) => state.error;
// export const getMessage = (state: State) => state.message;



import { StoreModule, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../shared/unils';

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
};

// export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getRouteStateParams = createSelector(getRouterState, state => {
    console.log('@@@=>', state);
    return state.state.params;
});
