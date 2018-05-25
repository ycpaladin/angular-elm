/**
 * 购物车 reducer
 */

import { CartItem } from '../models/cart';
import { CartActionTypes, Actions } from '../actions/cart.action';

/**
 * 购物车状态
 */
export interface State {
    /**
     * 购物车中的物品
     */
    items: CartItem[];
}

/**
 * 默认初始购物车
 */
const initialState: State = {
    items: []
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
