import { Position, Category, Shop } from '../models';
import { HomeActionTypes, Actions } from '../actions/home.action';

export interface State {
    isFetching: boolean;
    error: boolean;
    message?: string;
    categories?: Category[];
    shopList?: Shop[];
}


const initialState: State = {
    isFetching: true,
    error: false
};


export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case HomeActionTypes.LOAD_DATA_SUCESS:
            const { categories, shopList } = action;
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                message: undefined,
                categories,
                shopList
            });
        case HomeActionTypes.LOAD_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.message,
            });
        default:
            return state;
    }
}


export const getIsFetching = (state: State) => state.isFetching;
export const getError = (state: State) => state.error;
export const getMessage = (state: State) => state.message;
export const getCategories = (state: State) => {
    return state.categories;
};
export const getShopList = (state: State) => state.shopList;
