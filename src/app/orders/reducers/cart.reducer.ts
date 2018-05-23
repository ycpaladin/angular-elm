import { CartItem } from '../models/cart';
import { CartActionTypes, Actions } from '../actions/cart.action';

export interface State {
    items: CartItem[];
}

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


export const getCartItems = (state: State) => state.items;
