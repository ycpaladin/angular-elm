
import * as fromHome from './home.reducer';
import * as fromPosition from './position.reducer';
import * as fromRoot from '../../store';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

export interface CityState {
  home: fromHome.State;
  position: fromPosition.State;
}

export interface State extends fromRoot.State {
  city: CityState;
}

export const reducer: ActionReducerMap<CityState> = {
  home: fromHome.reducer,
  position: fromPosition.reducer
};

export const getCityState = createFeatureSelector<CityState>('city');

export const city = createSelector(getCityState, state => state.home);
export const getGuessCityName = createSelector(city, fromHome.getGuessCity);
export const getGuessCityId = createSelector(city, fromHome.getGuessCityId);
export const getHotCities = createSelector(city, fromHome.getHotCities);
export const getCityGroup = createSelector(city, fromHome.getCityGroup);


export const position = createSelector(getCityState, state => state.position);
export const getPositionList = createSelector(position, fromPosition.getPositionList);
export const getPositionIsFeching = createSelector(position, fromPosition.getIsFetching);
export const getPositionError = createSelector(position, fromPosition.getError);
export const getPositionMessage = createSelector(position, fromPosition.getMessage);
