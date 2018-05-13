import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, forkJoin, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import * as actions from '../actions/home.actions';
import { HomeService } from '../services/home.service';

@Injectable({
    providedIn: 'root'
})
export class HomeEffects {

    constructor(private $actions: Actions, private $service: HomeService) {

    }

    @Effect() $loadCity: Observable<Action> = this.$actions
        .pipe(
            ofType(actions.HomeActions.LOAD_CITY_DATA),
            switchMap(() =>
                forkJoin([this.$service.getGuessCity(), this.$service.getHotCities(), this.$service.getCityGroup()])
                    .pipe(
                        map(([guess, hot, group]) => new actions.LoadCityDataSucess({ guess, hot, group })),
                        catchError(error => of(new actions.LoadCityDataFail('出现错误.')))
                    )
            )
        );
}
