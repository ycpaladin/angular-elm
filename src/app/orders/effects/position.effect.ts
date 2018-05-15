import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, forkJoin, of } from 'rxjs';
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
    private service$: PositionService,
    private cityHistoryService$: CityHistoryService) {
  }

  @Effect() defer$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPosition>(PositionActionTypes.LOAD_POSITION),
    switchMap((action) => this.service$.getPosition(action.geohash)
      .pipe(
        mergeMap(p =>
          forkJoin([this.service$.saveToLocal(p), this.cityHistoryService$.add(p)])
            .pipe(
              map(() => new LoadPositionSucess(p))
            )
        ),
        catchError(e => of(new LoadPositionFail(e)))
      ))
  );
}
