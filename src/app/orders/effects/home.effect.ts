import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, defer, forkJoin, of, combineLatest, zip } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError, tap, filter, delay, switchMap, } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomeActionTypes, LoadHomeDataSucess, LoadHomeDataFail, LoadHomeData } from '../actions/home.action';
import * as fromRoot from '../../store';
import * as fromOrder from '../reducers';
import * as fromRoute from '@ngrx/router-store';
import { PositionService } from '../../core/services/position.service';
import { LoadPositionSucess, LoadPositionFail } from '../../core/actions/position.action';
import { CityHistoryService } from '../../services/city-history.service';
import { getRouterState } from 'src/app/shared/unils';

@Injectable({
  providedIn: 'root'
})
export class HomeEffect {

  // https://github.com/BioPhoton/angular-ngrx-refactoring.git
  constructor(
    private actions$: Actions,
    private store$: Store<fromOrder.State>,
    private homeService: HomeService,
    private positionService: PositionService,
    private cityHistoryService: CityHistoryService,
  ) {
  }

   r$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(fromRoute.ROUTER_NAVIGATION),
    map((action: any) => action.payload),
    filter((payload: any) => payload.event.url.indexOf('/msite/home') !== -1),
    map((payload: any) => getRouterState(payload.routerState.root)),
    switchMap((params) => this.positionService.getPositionFromServer(params.geohash).pipe(
      mergeMap(position => combineLatest([this.positionService.saveToLocal(position), this.cityHistoryService.add(position)]).pipe(
        map(([r1, r2]) => new LoadPositionSucess(position))
      )),
      catchError(e => of(new LoadPositionFail(e)))
    ))
  ));


   loadpositionService: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<LoadHomeData>(HomeActionTypes.LOAD_HOME_DATA),
    // withLatestFrom(this.store$.pipe(select(fromOrder.getGeohash))),
    map(action => action.geohash), // 在这里要从路由中get，不能从store中get, 可能不一致
    mergeMap((geohash) => forkJoin([this.homeService.getCategories(geohash), this.homeService.searchShop(geohash)])
      .pipe(
        map(([categories, shopList]) => new LoadHomeDataSucess(categories, shopList)),
      )),
    catchError(e => of(new LoadHomeDataFail(e)))
  ));


}
