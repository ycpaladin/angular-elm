import { Category, Shop } from '../models';
import { HomeActionTypes, Actions } from '../actions/home.action';
import { chunk } from 'lodash';

export interface State {
  // isFetching: boolean;
  // error: boolean;
  // message?: string;
  categories?: Category[][];
  shopList?: Shop[];
}


const initialState: State = {
  // isFetching: false,
  // error: false
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

export const getCategories = (state: State) => state.categories;
export const getShopList = (state: State) => state.shopList;
