import { ShopCategory, ShopRating, ShopTag, ShopScore, ShowDetials } from '../models';
import { ShopActionTypes, Actions } from '../actions/shop.action';

export interface State {
  restaurant_id?: string;
  restaurants: {
    [key: string]: Restaurant;
  };
}

export interface Restaurant {
  detials?: ShowDetials;
  categories?: ShopCategory[];
  ratings?: ShopRating[];
  tags?: ShopTag[];
  scores?: ShopScore;
}


const initialState: State = {
  restaurants: {}
};

// function

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ShopActionTypes.LOAD_SHOP_DATA:
      return Object.assign({}, state, {
        restaurant_id: action.restaurant_id
      });
    case ShopActionTypes.LOAD_SHOP_DATA_SUCESS:
      const restaurant = getCurrentRestaurant(state);
      restaurant.categories = action.data.categories;
      restaurant.detials = action.data.detials;
      return getNewRestaurants(state, restaurant);
    case ShopActionTypes.LOAD_SHOP_RATING_SUCESS:
      const _restaurant = getCurrentRestaurant(state);
      _restaurant.ratings = action.data;
      return getNewRestaurants(state, _restaurant);
    case ShopActionTypes.LOAD_SHOP_SCORES_SUCESS:
      const __restaurant = getCurrentRestaurant(state);
      _restaurant.scores = action.data;
      return getNewRestaurants(state, __restaurant);
    case ShopActionTypes.LOAD_SHOP_TAGS_SUCESS:
      const ___restaurant = getCurrentRestaurant(state);
      _restaurant.tags = action.data;
      return getNewRestaurants(state, ___restaurant);
    default:
      return state;
  }
}

function getNewRestaurants(
  state: State,
  restaurant: Restaurant) {
  return Object.assign({}, state, {
    restaurants: {
      ...state.restaurants,
      [state.restaurant_id]: restaurant
    }
  });
}


export const getCurrentRestaurant = (state: State): Restaurant => state[state.restaurant_id] || {};
export const getRestaurantId = (state: State) => state.restaurant_id;
