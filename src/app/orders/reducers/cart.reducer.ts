/**
 * 购物车 reducer
 */

import { CartItem } from '../models/cart';
import { CartActionTypes, Actions } from '../actions/cart.action';
import { CartFood } from '../models';
import { groupBy } from 'lodash';

/**
 * 购物车状态
 */
export interface State {
    /**
     * 购物车中的物品
     */
    items: CartItem[];
    /**
     * 购物车总价
     */
    totalPrice: number;
}

/**
 * 默认初始购物车
 */
const initialState: State = {
    items: [],
    totalPrice: 0
};


export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case CartActionTypes.GET_ALL_CART_ITEMS_SUCESS:
            return Object.assign({}, state, {
                items: action.items
            });
        case CartActionTypes.CLEAR_ALL_CART_ITEMS_SUCESS:
            return initialState;
        default:
            return state;
    }


}

/**
 * 获取购物车中的所有物品
 * @param state 状态
 */
export const getCartItems = (state: State) => state.items;
export const getTotalPrice = (state: State) => {
    let total = 0;
    state.items.forEach((item) => {
        total += item.price;
    });

    return total;
};

export const getCartFoodList = (state: State): CartFood[] => {
    const x = groupBy(state.items, (item: CartItem) => item.item_id);
    return Object.keys(x).map(key => {
        const list = x[key];
        const { id, shopId, item_id, food_id, category_id, packing_fee, sku_id, stock, name, price, specs, } = list[0];
        const _: CartFood = {
            item_id,
            category_id,
            food_id,
            num: list.length,
            price,
            name,
            specs
        };
        return _;
    });

};
