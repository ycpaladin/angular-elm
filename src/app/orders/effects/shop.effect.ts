import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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

    constructor(private actions$: Actions, private service$: ShopService, private store$: Store<fromOrder.State>) { }

    @Effect() loadShop$: Observable<Action> = this.actions$.pipe(
        ofType<LoadShopData>(ShopActionTypes.LOAD_SHOP_DATA),
        map(action => action.restaurantId),
        withLatestFrom(this.store$.pipe(select(fromOrder.getPosition))),
        mergeMap(([restaurantId, { latitude, longitude }]) =>
            forkJoin([
                this.service$.getShopDetails(restaurantId, latitude.toString(), longitude.toString()),
                this.service$.getShopCategories(restaurantId)]).pipe(
                    map(([detials, categories]) => new LoadShopDataSucess({ detials, categories }))
                )),
        catchError(e => of(new LoadShopDataFail(e)))
    );

    @Effect() loadShopRating$: Observable<Action> = this.actions$.pipe(
        ofType<LoadShopRatings>(ShopActionTypes.LOAD_SHOP_RATING),
        withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
        mergeMap(([, restaurantId]) => this.service$.getRatings(restaurantId).pipe(
            map(d => new LoadShopRatingsSucess(d))
        )),
        catchError(e => of(new LoadShopRatingsFail(e)))
    );

    @Effect() loadShopScores$: Observable<Action> = this.actions$.pipe(
        ofType<LoadShopScores>(ShopActionTypes.LOAD_SHOP_SCORES),
        withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
        mergeMap(([, restaurantId]) => this.service$.getScores(restaurantId).pipe(
            map(d => new LoadShopScoresSucess(d))
        )),
        catchError(e => of(new LoadShopScoresFail(e)))
    );

    @Effect() loadShopTags$: Observable<Action> = this.actions$.pipe(
        ofType<LoadShopTags>(ShopActionTypes.LOAD_SHOP_TAGS),
        withLatestFrom(this.store$.pipe(select(fromOrder.getShopId))),
        mergeMap(([, restaurantId]) => this.service$.getTags(restaurantId).pipe(
            map(d => new LoadShopTagsSucess(d))
        )),
        catchError(e => of(new LoadShopTagsFail(e)))
    );

}
