import { Injectable } from '@angular/core';
import { CityService } from '../services/city.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as actions from '../actions/city.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CityEffects {

    constructor(private $actions: Actions, private $service: CityService) { }

    @Effect() $getSearchHistory: Observable<Action> = this.$actions.pipe(
        ofType(actions.CityEnum.GET_SEARCH_HISTORY_LIST),
        switchMap(() => this.$service.getSearchHistory()
            .pipe(
                map(data => new actions.GetSearchHistoryListSucess(data)),
            // catchError(e=> of(new actions.))
        )
        )
    );
}
