import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShopService } from '../services/shop.service';
import { Observable, of, forkJoin } from 'rxjs';
import {
  LoadShopData, ShopActionTypes, LoadShopDataSucess, LoadShopDataFail,
  LoadShopRatings, LoadShopRatingsSucess, LoadShopRatingsFail, LoadShopScores,
  LoadShopScoresSucess, LoadShopScoresFail, LoadShopTags, LoadShopTagsSucess, LoadShopTagsFail
} from '../actions/shop.action';
import { Action, Store, select } from '@ngrx/store';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import * as fromOrder from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class ShopEffect {

  constructor(private actions$: Actions, private store$: Store<fromOrder.State>, private shopService: ShopService) { }

   loadShop$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<LoadShopData>(ShopActionTypes.LOAD_SHOP_DATA),
    map(action => action.restaurantId),
    withLatestFrom(this.store$.pipe(select(fromOrder.getPosition))),
    mergeMap(([restaurantId, { latitude, longitude }]) =>
      forkJoin([
        this.shopService.getShopDetails(restaurantId, latitude.toString(), longitude.toString()),
        this.shopService.getShopCategories(restaurantId)]).pipe(
          map(([detials, categories]) => new LoadShopDataSucess({ detials, categories }))
        )),
    catchError(e => of(new LoadShopDataFail(e)))
  ));

   loadShopRating$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<LoadShopRatings>(ShopActionTypes.LOAD_SHOP_RATING),
    withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
    mergeMap(([, restaurantId]) => this.shopService.getRatings(restaurantId).pipe(
      map(d => new LoadShopRatingsSucess(d))
    )),
    catchError(e => of(new LoadShopRatingsFail(e)))
  ));

   loadShopScores$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<LoadShopScores>(ShopActionTypes.LOAD_SHOP_SCORES),
    withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
    mergeMap(([, restaurantId]) => this.shopService.getScores(restaurantId).pipe(
      map(d => new LoadShopScoresSucess(d))
    )),
    catchError(e => of(new LoadShopScoresFail(e)))
  ));

   loadShopTags$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<LoadShopTags>(ShopActionTypes.LOAD_SHOP_TAGS),
    withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
    mergeMap(([, restaurantId]) => this.shopService.getTags(restaurantId).pipe(
      map(d => new LoadShopTagsSucess(d))
    )),
    catchError(e => of(new LoadShopTagsFail(e)))
  ));

}
