/**
 * HTTP 请求状态
 */

import * as homeActions from '../actions/home.action';
import * as searchActions from '../actions/search.action';
import * as shopActions from '../actions/shop.action';

/**
 * HTTP 请求状态
 */
export interface State {
    /**
     * 是否正处于HTTP请求的状态，一般用于控制显示页面中正在加载的动画
     */
    isFetching: boolean;
    /**
     * HTTP请求是否出现了错误
     */
    error: boolean;
    /**
     * HTTP请求返回的消息，可以是成功的消息，也可以是错误消息，但是目前基本上全部是错误消息
     */
    message?: string;
}

const initialState: State = {
    isFetching: false,
    error: false,
};


export function reducer(state: State = initialState, action: homeActions.Actions | searchActions.Actions | shopActions.Actions): State {
    switch (action.type) {
        case homeActions.HomeActionTypes.LOAD_HOME_DATA:
        case searchActions.OrderSearchActionTypes.LOAD_SEARCH_HISTORY:
        // case searchActions.OrderSearchActionTypes.CLEAR_SEARCH_HISTORY:
        // case searchActions.OrderSearchActionTypes.DELETE_SEARCH_HISTORY:
        case searchActions.OrderSearchActionTypes.SEARCH_FETCHING:
        case shopActions.ShopActionTypes.LOAD_SHOP_DATA:
        case shopActions.ShopActionTypes.LOAD_SHOP_SCORES:
        case shopActions.ShopActionTypes.LOAD_SHOP_RATING:
        case shopActions.ShopActionTypes.LOAD_SHOP_TAGS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                message: undefined,
            });

        case homeActions.HomeActionTypes.LOAD_HOME_DATA_SUCESS:
        case searchActions.OrderSearchActionTypes.LOAD_SEARCH_HISTORY_SUCESS:
        case searchActions.OrderSearchActionTypes.SEARCH_SUCESS:
        case shopActions.ShopActionTypes.LOAD_SHOP_DATA_SUCESS:
        case shopActions.ShopActionTypes.LOAD_SHOP_RATING_SUCESS:
        case shopActions.ShopActionTypes.LOAD_SHOP_SCORES_SUCESS:
        case shopActions.ShopActionTypes.LOAD_SHOP_TAGS_SUCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                message: undefined,
            });
        case homeActions.HomeActionTypes.LOAD_HOME_DATA_FAIL:
        case searchActions.OrderSearchActionTypes.CLEAR_SEARCH_HISTORY_FAIL:
        case searchActions.OrderSearchActionTypes.DELETE_SEARCH_HISTORY_FAIL:
        case searchActions.OrderSearchActionTypes.LOAD_SEARCH_HISTORY_FAIL:
        case searchActions.OrderSearchActionTypes.SEARCH_FAIL:
        case shopActions.ShopActionTypes.LOAD_SHOP_DATA_FAIL:
        case shopActions.ShopActionTypes.LOAD_SHOP_SCORES_FAIL:
        case shopActions.ShopActionTypes.LOAD_SHOP_RATING_FAIL:
        case shopActions.ShopActionTypes.LOAD_SHOP_TAGS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.message
            });

        default:
            return state;
    }
}


export const getIsFetching = (state: State) => state.isFetching;
export const getError = (state: State) => state.error;
export const getMessage = (state: State) => state.message;

