import { ShopCategory, ShopRating, ShopTag, ShopScore, ShopDetials } from '../models';
import { ShopActionTypes, Actions } from '../actions/shop.action';

export interface State {
  restaurant_id?: string;
  restaurants: {
    [key: string]: Restaurant;
  };
}

export interface Restaurant {
  detials?: ShopDetials;
  categories?: ShopCategory[];
  ratings?: ShopRating[];
  tags?: ShopTag[];
  scores?: ShopScore;
}


const initialState: State = {
  restaurants: {}
};

// function

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ShopActionTypes.LOAD_SHOP_DATA:
      return Object.assign({}, state, {
        restaurant_id: action.restaurant_id
      });
    case ShopActionTypes.LOAD_SHOP_DATA_SUCESS:
      const restaurant = getCurrentRestaurant(state);
      restaurant.categories = action.data.categories;
      restaurant.detials = action.data.detials;
      return getNewState(state, restaurant);
    case ShopActionTypes.LOAD_SHOP_RATING_SUCESS:
      const _restaurant = getCurrentRestaurant(state);
      _restaurant.ratings = action.data;
      return getNewState(state, _restaurant);
    case ShopActionTypes.LOAD_SHOP_SCORES_SUCESS:
      const __restaurant = getCurrentRestaurant(state);
      _restaurant.scores = action.data;
      return getNewState(state, __restaurant);
    case ShopActionTypes.LOAD_SHOP_TAGS_SUCESS:
      const ___restaurant = getCurrentRestaurant(state);
      _restaurant.tags = action.data;
      return getNewState(state, ___restaurant);
    default:
      return state;
  }
}

function getNewState(state: State, restaurant: Restaurant) {
  return Object.assign({}, state, {
    restaurants: {
      ...state.restaurants,
      [state.restaurant_id]: restaurant
    }
  });
}


export const getCurrentRestaurant = (state: State): Restaurant => (state.restaurant_id && state[state.restaurant_id]) || {};
export const getRestaurantId = (state: State) => state.restaurant_id;

export const getCategories = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).categories;
export const getRatings = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).ratings;
export const getScores = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).scores;
export const getTags = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).tags;
export const getDetials = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).detials;
