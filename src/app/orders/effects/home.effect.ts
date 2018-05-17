import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, defer, forkJoin, of } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError, tap, filter, delay } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomeActionTypes, LoadDataSucess, LoadDataFail } from '../actions/home.action';
import { PositionActionTypes, LoadPosition } from '../actions/position.action';
import * as fromRoot from '../../store';
import { PositionService } from '../services/position.service';
import * as fromOrder from '../reducers';
import * as fromRoute from '@ngrx/router-store';

@Injectable({
    providedIn: 'root'
})
export class HomeEffect {

    // https://github.com/BioPhoton/angular-ngrx-refactoring.git
    constructor(
        private actions$: Actions,
        private router$: Router,
        private service$: HomeService,
        // private store$: Store<fromOrder.State>,
        private positionService$: PositionService) {
        // this.route$.params.subscribe(p => console.log(p));
        // fromRoute.
        // console.log(this.route$.events)
    }


    @Effect({ dispatch: false }) nav$ = this.actions$.pipe(
        ofType(fromRoute.ROUTER_NAVIGATION),
        map((action: any) => (<RoutesRecognized>action.payload.event).state),
        tap((action) => {
            console.log('====================>@s', action);
        })
    );


    @Effect() loadPosition$: Observable<Action> = this.actions$.pipe(
        ofType<LoadPosition>(PositionActionTypes.LOAD_POSITION),
        map(action => action.geohash),
        mergeMap(geohash =>
            forkJoin([this.service$.getCategories(geohash), this.service$.searchShop(geohash)])
                .pipe(
                    map(([categories, shopList]) => new LoadDataSucess(categories, shopList)),
            )),
        catchError(e => of(new LoadDataFail(e)))
    );


}
