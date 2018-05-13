
import * as actions from '../actions/home.actions';
import { City, CityGroup } from '../models/home';

export interface State {
    /**
     * 当前城市
     */
    guessCity: string;

    /**
     * 当前城市id
     */
    guessCityid: string;
    /**
     * 热门城市列表
     */
    hotcity?: City[];
    /**
     * 所有城市列表
     */
    groupcity?: { key: string, cities: City[] }[];
}


const initialState: State = {
    guessCity: '',
    guessCityid: '',
};

function sortgroupcity(cityGroup: CityGroup): { key: string, cities: City[] }[] {
    return Object.keys(cityGroup).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).map(key => ({ key, cities: cityGroup[key] }));
}

export function reducer(state: State = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.HomeActions.LOAD_CITY_DATA_SUCESS:
            const { guess: { id, name }, hot: hotcity, group } = action.data;
            return Object.assign({}, state, {
                guessCity: name,
                guessCityid: id,
                hotcity,
                groupcity: sortgroupcity(group)
            });
        case actions.HomeActions.LOAD_CITY_DATA_FAIL:
        default:
            return state;
    }
}

export const getGuessCity = (state: State) => state.guessCity;
export const getGuessCityId = (state: State) => state.guessCityid;
export const getHotCities = (state: State) => state.hotcity;
export const getCityGroup = (state: State) => state.groupcity;


