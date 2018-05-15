import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, forkJoin, of, combineLatest, zip } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HomeActionTypes, LoadDataSucess, LoadDataFail } from '../actions/home.action';
import { PositionService } from '../services/position.service';
import { PositionActionTypes, LoadPositionSucess, LoadPositionFail, LoadPosition } from '../actions/position.action';
import { CityHistoryService } from '../../services/city-history.service';

@Injectable({
  providedIn: 'root'
})
export class PositionEffect {

  constructor(private actions$: Actions,
    private positionService$: PositionService,
    private cityHistoryService$: CityHistoryService) {
  }

  @Effect() defer$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPosition>(PositionActionTypes.LOAD_POSITION),
    map(action => action.geohash),
    switchMap(geohash => this.positionService$.getPositionFromServer(geohash)
      .pipe(
        mergeMap(p => this.cityHistoryService$.add(p) // this.positionService$.saveToLocal(p),
          .pipe(
            map(() => {
              return new LoadPositionSucess(p);
            })
          )),
        catchError(e => of(new LoadPositionFail(e)))
      ))
  );
}
