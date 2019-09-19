import { ShopCategory, ShopRating, ShopTag, ShopScore, ShopDetials } from '../models';
import { ShopActionTypes, Actions } from '../actions/shop.action';

export interface State {
    restaurant_id?: number;
    category_id?: string;
    food_id?: string;
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
    const restaurant = getCurrentRestaurant(state);
    switch (action.type) {
        case ShopActionTypes.LOAD_SHOP_DATA:
            return Object.assign({}, state, {
                restaurant_id: action.restaurantId
            });
        case ShopActionTypes.LOAD_SHOP_DATA_SUCESS:
            // const restaurant = getCurrentRestaurant(state);
            restaurant.categories = action.data.categories;
            restaurant.detials = action.data.detials;
            return getNewState(state, restaurant);
        case ShopActionTypes.LOAD_SHOP_RATING_SUCESS:
            // const restaurant1 = getCurrentRestaurant(state);
            restaurant.ratings = action.data;
            return getNewState(state, restaurant);
        case ShopActionTypes.LOAD_SHOP_SCORES_SUCESS:
            // const __restaurrestaurantant = getCurrentRestaurant(state);
            restaurant.scores = action.data;
            return getNewState(state, restaurant);
        case ShopActionTypes.LOAD_SHOP_TAGS_SUCESS:
            // const ___restaurant = getCurrentRestaurant(state);
            restaurant.tags = action.data;
            return getNewState(state, restaurant);
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
export const getCategoryId = (state: State) => state.category_id;
export const getFoodId = (state: State) => state.food_id;
// const get
export const getCategories = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).categories;
export const getRatings = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).ratings;
export const getScores = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).scores;
export const getTags = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).tags;
export const getDetials = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {}).detials;
// export const getFoodById = (state: State) => (state.restaurant_id && state.restaurants[state.restaurant_id] || {});

