import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, defer, forkJoin, of } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError, switchMap } from 'rxjs/operators';
import {
    OrderSearchActionTypes, LoadSearchHistory, LoadSearchHistorySucess,
    LoadSearchHistoryFail, Search, SearchSucess, SearchFail, ClearSearchHistoryFail, DeleteSearchHistory, DeleteSearchHistoryFail
} from '../actions/search.action';
import { SearchService } from '../services/search.service';
import * as fromOrder from '../reducers';
import { ClearHistoryList } from '../../city/actions/search.action';

@Injectable({
    providedIn: 'root'
})
export class SearchEffect {

    constructor(private actions$: Actions, private store$: Store<fromOrder.State>, private searchService: SearchService) {

    }

    @Effect() defer$: Observable<Action> = defer(() => {
      console.log('search.effect..');
    });

    @Effect() loadSearchHistory$: Observable<Action> = this.actions$.pipe(
        ofType<LoadSearchHistory>(OrderSearchActionTypes.LOAD_SEARCH_HISTORY),
        mergeMap(() =>
            this.searchService.getSearchHistory()
                .pipe(
                    map(d => new LoadSearchHistorySucess(d)),
            )),
        catchError(e => of(new LoadSearchHistoryFail(e)))
    );

    @Effect() loadSearchResult$: Observable<Action> = this.actions$.pipe(
        ofType<Search>(OrderSearchActionTypes.SEARCH_FETCHING),
        map(action => action.keyword),
        withLatestFrom(this.store$.pipe(select(fromOrder.getPosition))),
        switchMap(([keyword, { geohash }]) => this.searchService.getSearchResult(geohash, keyword).pipe(
            map(d => new SearchSucess(d)),
            catchError(e => of(new SearchFail(e)))
        ))
    );

    @Effect() clearSearchHistory$: Observable<Action> = this.actions$.pipe(
        ofType<ClearHistoryList>(OrderSearchActionTypes.CLEAR_SEARCH_HISTORY),
        mergeMap(() => this.searchService.clearSearchHistory().pipe(
            mergeMap(() => this.searchService.getSearchHistory().pipe(
                map(d => new LoadSearchHistorySucess(d))
            ))
        )),
        catchError(e => of(new ClearSearchHistoryFail(e)))
    );

    @Effect() deleteSearchHistory$: Observable<Action> = this.actions$.pipe(
        ofType<DeleteSearchHistory>(OrderSearchActionTypes.DELETE_SEARCH_HISTORY),
        map(action => action.id),
        mergeMap(id => this.searchService.deleteSearchHistory(id).pipe(
            mergeMap(() => this.searchService.getSearchHistory().pipe(
                map(d => new LoadSearchHistorySucess(d))
            ))
        )),
        catchError(e => of(new DeleteSearchHistoryFail(e)))
    );

}
