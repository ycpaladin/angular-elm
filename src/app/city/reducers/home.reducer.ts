
import { HomeActionTypes, Actions } from '../actions/home.actions';
import { City, CityGroup } from '../models/home';
import { reduce, flow, map, find } from 'lodash';

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

function findByCityId(array: { key: string, cities: City[] }[], id: string): City {
  const r = map(array, t => t.cities);
  const r2 = reduce(r, (prev, curr) => [...prev, ...curr]);
  const r3 = find(r2, (t: City) => t.id === parseInt(id, 10));
  return r3;
}

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case HomeActionTypes.LOAD_CITY_DATA_SUCESS:
      const { guess: { id, name }, hot: hotcity, group } = action.data;
      return Object.assign({}, state, {
        guessCityid: id,
        hotcity,
        groupcity: sortgroupcity(group)
      });
    case HomeActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {
        guessCityid: action.id,
      });
    case HomeActionTypes.LOAD_CITY_DATA_FAIL:
    default:
      return state;
  }
}

export const getGuessCity = (state: State) => {
  if (state.guessCityid && state.groupcity) {
    const { name: guessCity } = findByCityId(state.groupcity, state.guessCityid);
    return guessCity;
  } else {
    return '';
  }
};
export const getGuessCityId = (state: State) => state.guessCityid;
export const getHotCities = (state: State) => state.hotcity;
export const getCityGroup = (state: State) => state.groupcity;


