import { StoreModule, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import * as fromPosition from '../core/reducers/position.reducer';
import { RouterStateUrl } from '../shared/unils';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  position: fromPosition.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  position: fromPosition.reducer
};

// export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getRouteStateParams = createSelector(getRouterState, state => {
  // console.log('@@@=>', state);
  return state.state.params;
});

export const getPositionState = (state: State) => state.position;
export const getPosition = createSelector(getPositionState, fromPosition.getPosition);
export const getPositionName = createSelector(getPositionState, fromPosition.getPositionName);
export const getGeohash = createSelector(getPositionState, fromPosition.getgeohash);
// export const getPosit

