
import * as fromHome from './home.reducer';
import * as fromSearch from './search.reducer';
import * as fromRoot from '../../store';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

export interface CityState {
  home: fromHome.State;
  search: fromSearch.State;
}

export interface State extends fromRoot.State {
  city: CityState;
}

export const reducer: ActionReducerMap<CityState> = {
  home: fromHome.reducer,
  search: fromSearch.reducer
};

export const getCityState = createFeatureSelector<CityState>('city');

export const city = createSelector(getCityState, state => state.home);
export const getGuessCityName = createSelector(city, fromHome.getGuessCity);
export const getGuessCityId = createSelector(city, fromHome.getGuessCityId);
export const getHotCities = createSelector(city, fromHome.getHotCities);
export const getCityGroup = createSelector(city, fromHome.getCityGroup);


export const search = createSelector(getCityState, state => state.search);
export const getPositionList = createSelector(search, fromSearch.getPositionList);
export const getPositionIsFeching = createSelector(search, fromSearch.getIsFetching);
export const getPositionError = createSelector(search, fromSearch.getError);
export const getPositionMessage = createSelector(search, fromSearch.getMessage);
export const getSearchHistory = createSelector(search, fromSearch.getSearchHistory);
