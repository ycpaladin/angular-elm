import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    CartActionTypes, GetAllCartItem, GetAllCartItemSucess,
    GetAllCartItemFail, AddCartItem, AddCartItemSucess, AddCartItemFail,
    RemoveCartItem, RemoveCartItemSucess, RemoveCartItemFail, ClearAllCartItem, ClearAllCartItemSucess, ClearAllCartItemFail
} from '../actions/cart.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Injectable({
    providedIn: 'root'
})
export class CartEffect {

    constructor(private actions$: Actions, private service$: CartService) { }

    @Effect() getAll$: Observable<Action> = this.actions$.pipe(
        ofType<GetAllCartItem>(CartActionTypes.GET_ALL_CART_ITEMS),
        mergeMap(() => this.service$.getAll().pipe(
            map(d => new GetAllCartItemSucess(d)),
            catchError(e => of(new GetAllCartItemFail(e)))
        ))
    );

    @Effect() add$: Observable<Action> = this.actions$.pipe(
        ofType<AddCartItem>(CartActionTypes.ADD_CART_ITEM),
        map(action => action.item),
        mergeMap(item => this.service$.addOneAndGetAll(item).pipe(
            map(d => new GetAllCartItemSucess(d)),
            catchError(e => of(new AddCartItemFail(e)))
        ))
    );

    @Effect() delete$: Observable<Action> = this.actions$.pipe(
        ofType<RemoveCartItem>(CartActionTypes.REMOVE_CART_ITEM),
        map(action => action.id),
        mergeMap(id => this.service$.removeOneAndGetAll(id).pipe(
            map(d => new GetAllCartItemSucess(d)),
            catchError(e => of(new RemoveCartItemFail(e)))
        ))
    );

    @Effect() clearAll$: Observable<Action> = this.actions$.pipe(
        ofType<ClearAllCartItem>(CartActionTypes.CLEAR_ALL_CART_ITEMS),
        mergeMap(() => this.service$.clearAll().pipe(
            map(() => new ClearAllCartItemSucess()),
            catchError(e => of(new ClearAllCartItemFail(e)))
        ))
    );

}

