import { Injectable } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import * as cityStore from '../reducers';
import {
    SearchActionTypes,
    GetSearchHistoryListSucess, SearchPositionSucess,
    SearchPositionFail, SearchPosition, ClearHistoryList, ClearHistoryListSucess, ClearHistoryListFail
} from '../actions/search.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CityHistoryService } from '../../services/city-history.service';
@Injectable({
    providedIn: 'root'
})
export class SearchEffects {

    constructor(private actions$: Actions,
        private store$: Store<cityStore.State>,
        private service$: SearchService,
        private cityHistoryService$: CityHistoryService) { }

    @Effect() $getSearchHistory: Observable<Action> = this.actions$.pipe(
        ofType(SearchActionTypes.GET_SEARCH_HISTORY_LIST),
        switchMap(() => this.cityHistoryService$.getSearchHistory()
            .pipe(
                map(data => new GetSearchHistoryListSucess(data)),
            // catchError(e=> of(new ))
        )
        )
    );

    @Effect() $search: Observable<Action> = this.actions$.pipe(
        ofType<SearchPosition>(SearchActionTypes.SEARCH_POSITION),
        map(action => action.keyword),
        withLatestFrom(
            this.store$.pipe(
                select(cityStore.getGuessCityId)
            )
        ),
        switchMap(([keyword, city_id]) =>
            this.service$.searchPosition(city_id, keyword).pipe(
                map(data => new SearchPositionSucess(data)),
                catchError(e => of(new SearchPositionFail(e)))
            ))
    );

    @Effect() $clearHistory: Observable<Action> = this.actions$.pipe(
        ofType<ClearHistoryList>(SearchActionTypes.CLEAR_SEARCH_HISTORY),
        switchMap(() => this.cityHistoryService$.clear().pipe(
            map(r => new ClearHistoryListSucess()),
            catchError(e => of(new ClearHistoryListFail(e)))
        ))
    );
}
