import { Action } from '@ngrx/store';
import { Position } from '../models';

export enum PositionActionTypes {
    LOAD_POSITION = '[Order Position] LOAD_POSITION',
    LOAD_POSITION_SUCESS = '[Order Position] LOAD_POSITION_SUCESS',
    LOAD_POSITION_FAIL = '[Order Position] LOAD_POSITION_FAIL'
}


export class LoadPosition implements Action {
    readonly type = PositionActionTypes.LOAD_POSITION;
    constructor(public geohash: string) { }
}

export class LoadPositionSucess implements Action {
    readonly type = PositionActionTypes.LOAD_POSITION_SUCESS;
    constructor(public position: Position) { }
}

export class LoadPositionFail implements Action {
    readonly type = PositionActionTypes.LOAD_POSITION_FAIL;
    constructor(public message: string) { }
}

export type Actions = LoadPosition | LoadPositionSucess | LoadPositionFail;

