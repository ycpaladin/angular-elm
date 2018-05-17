import * as fromHome from './home.reducer';
import * as fromPosition from './position.reducer';
import * as fromRoot from '../../store';
import * as fromSearch from './search.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface OrderState {
    home: fromHome.State;
    position: fromPosition.State;
    search: fromSearch.State;
}


export interface State extends fromRoot.State {
    order: OrderState;
}


export const reducer: ActionReducerMap<OrderState> = {
    home: fromHome.reducer,
    position: fromPosition.reducer,
    search: fromSearch.reducer,
};

export const getOrderState = createFeatureSelector<OrderState>('order');

export const homeState = createSelector(getOrderState, state => state.home);
export const getHomeFetching = createSelector(homeState, fromHome.getIsFetching);
export const getHomeError = createSelector(homeState, fromHome.getError);
export const getHomeMessage = createSelector(homeState, fromHome.getMessage);
export const getHomeCategories = createSelector(homeState, fromHome.getCategories);
export const getHomeShopList = createSelector(homeState, fromHome.getShopList);

export const positionState = createSelector(getOrderState, state => state.position);
export const getPosition = createSelector(positionState, fromPosition.getPosition);
export const getPositionName = createSelector(positionState, fromPosition.getPositionName);

export const searchState = createSelector(getOrderState, state => state.search);
export const getSearchFetching = createSelector(searchState, fromSearch.getIsFetching);
export const getSearchError = createSelector(searchState, fromSearch.getError);
export const getSearchMessage = createSelector(searchState, fromSearch.getMessage);
export const getSearchResult = createSelector(searchState, fromSearch.getSearchResult);
export const getSearchHistory = createSelector(searchState, fromSearch.getSearchHistory);

export const getRootState = (state: State) => state.router;
export const getRouterState = createSelector(getRootState, state => {
    console.log(state);
    return state;
});
export const getRouteParams = createSelector(getRouterState, state => state.state.params);

