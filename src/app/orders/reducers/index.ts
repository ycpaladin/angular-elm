import * as fromHome from './home.reducer';
import * as fromPosition from './position.reducer';
import * as fromRoot from '../../store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface OrderState {
    home: fromHome.State;
    position: fromPosition.State;
}


export interface State extends fromRoot.State {
    order: OrderState;
}


export const reducer: ActionReducerMap<OrderState> = {
    home: fromHome.reducer,
    position: fromPosition.reducer
};

export const getOrderState = createFeatureSelector<OrderState>('order');

export const homeState = createSelector(getOrderState, state => state.home);
export const getHomeFetching = createSelector(homeState, fromHome.getIsFetching);
export const getHomeError = createSelector(homeState, fromHome.getError);
export const getHomeMessage = createSelector(homeState, fromHome.getMessage);
export const getHomeCategories = createSelector(homeState, fromHome.getCategories);
export const getHomeShopList = createSelector(homeState, fromHome.getShopList);

export const positionState = createSelector(getOrderState, state => state.position);



