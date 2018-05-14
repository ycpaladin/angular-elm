import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, forkJoin, of, defer } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import { LoadCityDataSucess, LoadCityDataFail } from '../actions/home.actions';
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root'
})
export class HomeEffects {

  constructor(private actions$: Actions, private service$: HomeService) {
  }

  @Effect() $defer: Observable<Action> = defer(
    () => forkJoin([this.service$.getGuessCity(), this.service$.getHotCities(), this.service$.getCityGroup()])
      .pipe(
        map(([guess, hot, group]) => new LoadCityDataSucess({ guess, hot, group })),
        tap((action) => {
          this.service$.saveToLocal(action.data.group);
        }),
        catchError(error => of(new LoadCityDataFail('出现错误.')))
      )
  );


}
