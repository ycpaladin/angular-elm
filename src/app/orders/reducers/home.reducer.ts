/**
 * 购物首页的状态
 */


import { Category, Shop } from '../models';
import { HomeActionTypes, Actions } from '../actions/home.action';
import { chunk } from 'lodash';

export interface State {
    /**
     * 首页上半部分分类
     */
    categories?: Category[][];
    /**
     * 附近商家
     */
    shopList?: Shop[];
}


const initialState: State = {
};


export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case HomeActionTypes.LOAD_HOME_DATA_SUCESS:
            const { categories, shopList } = action;
            return Object.assign({}, state, {
                categories: chunk(categories, 8),
                shopList
            });
        default:
            return state;
    }
}

/**
 * 获取首页上半部分分类
 * @param state
 */
export const getCategories = (state: State) => state.categories;

/**
 * 获取附近商家
 * @param state
 */
export const getShopList = (state: State) => state.shopList;
