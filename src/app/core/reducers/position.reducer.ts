import { PositionActionTypes, Actions } from '../actions/position.action';
import { Position } from '../models';

export interface State {
  position?: Position;
}

const initialState: State = {};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case PositionActionTypes.LOAD_POSITION_SUCESS:
      return Object.assign({}, state, { position: action.position });
    case PositionActionTypes.LOAD_POSITION_FAIL:
    case PositionActionTypes.LOAD_POSITION:
    default:
      return state;
  }
}


export const getPosition = (state: State) => state.position;
export const getPositionName = (state: State) => (state.position && state.position.name) || '请选择地址...';
export const getgeohash = (state: State) => (state.position && state.position.geohash) || '';

