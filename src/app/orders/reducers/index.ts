import * as fromHome from './home.reducer';
import * as fromRoot from '../../store';
import * as fromSearch from './search.reducer';
import * as fromStatus from './httpStatus.reducer';
import * as fromShop from './shop.reducer';
import * as fromCart from './cart.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ShopCommData } from '../models';

export interface OrderState {
    home: fromHome.State;
    status: fromStatus.State;
    shop: fromShop.State;
    search: fromSearch.State;
    cart: fromCart.State;
}


export interface State extends fromRoot.State {
    order: OrderState;
}


export const reducer: ActionReducerMap<OrderState> = {
    home: fromHome.reducer,
    status: fromStatus.reducer,
    shop: fromShop.reducer,
    search: fromSearch.reducer,
    cart: fromCart.reducer,
};

export const getOrderState = createFeatureSelector<OrderState>('order');

export const homeState = createSelector(getOrderState, state => state.home);
export const getHomeCategories = createSelector(homeState, fromHome.getCategories);
export const getHomeShopList = createSelector(homeState, fromHome.getShopList);


export const searchState = createSelector(getOrderState, state => state.search);
export const getSearchResult = createSelector(searchState, fromSearch.getSearchResult);
export const getSearchHistory = createSelector(searchState, fromSearch.getSearchHistory);

export const getRootState = (state: State) => state.router;
export const getRouterState = createSelector(getRootState, state => state);
export const getRouteParams = createSelector(getRouterState, state => state.state.params);


export const statuState = createSelector(getOrderState, state => state.status);
export const getFetching = createSelector(statuState, fromStatus.getIsFetching);
export const getError = createSelector(statuState, fromStatus.getError);
export const getMessage = createSelector(statuState, fromStatus.getMessage);

export const shopState = createSelector(getOrderState, state => state.shop);
export const getShop = createSelector(shopState, fromShop.getCurrentRestaurant);
export const getShopId = createSelector(shopState, fromShop.getRestaurantId);
export const getCategoryId = createSelector(shopState, fromShop.getCategoryId);
export const getFoodId = createSelector(shopState, fromShop.getFoodId);
export const getShopCategories = createSelector(shopState, fromShop.getCategories);
export const getShopRatings = createSelector(shopState, fromShop.getRatings);
export const getShopScores = createSelector(shopState, fromShop.getScores);
export const getShopTags = createSelector(shopState, fromShop.getTags);
export const getShopDetials = createSelector(shopState, fromShop.getDetials);



// export const getFoodById = createSelector(
//     getShopCategories,
//     getFoodId,
//     (categories, foodId) => categories[categoryId].);

export const cartState = createSelector(getOrderState, state => state.cart);
export const getCartItems = createSelector(cartState, fromCart.getCartItems);
export const getTotalPrice = createSelector(cartState, fromCart.getTotalPrice);
export const getCartFoodList = createSelector(cartState, fromCart.getCartFoodList);

export { getPosition, getPositionName, getGeohash } from '../../store';

export const getShopCommData = createSelector(
    getCartFoodList,
    getTotalPrice,
    (cartFoodList, totalPrice) => {
        const r: ShopCommData = { totalPrice, cartFoodList, categoryNum: [] };
        return r;
    }
);



