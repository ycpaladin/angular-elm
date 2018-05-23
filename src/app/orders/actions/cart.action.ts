import { Action } from '@ngrx/store';
import { CartItem } from '../models/cart';

export enum CartActionTypes {
    GET_ALL_CART_ITEMS = '[CART] GET_ALL_CART_ITEMS',
    GET_ALL_CART_ITEMS_SUCESS = '[CART] GET_ALL_CART_ITEMS_SUCESS',
    GET_ALL_CART_ITEMS_FAIL = '[CART] GET_ALL_CART_ITEMS_FAIL',
    ADD_CART_ITEM = '[CART] ADD_CART_ITEM',
    ADD_CART_ITEM_SUCESS = '[CART] ADD_CART_ITEM_SUCESS',
    ADD_CART_ITEM_FAIL = '[CART] ADD_CART_ITEM_FAIL',
    REMOVE_CART_ITEM = '[CART] REMOVE_CART_ITEM',
    REMOVE_CART_ITEM_SUCESS = '[CART] REMOVE_CART_ITEM_SUCESS',
    REMOVE_CART_ITEM_FAIL = '[CART] REMOVE_CART_ITEM_FAIL',
    CLEAR_ALL_CART_ITEMS = '[CART] CLEAR_ALL_CART_ITEMS',
    CLEAR_ALL_CART_ITEMS_SUCESS = '[CART] CLEAR_ALL_CART_ITEMS_SUCESS',
    CLEAR_ALL_CART_ITEMS_FAIL = '[CART] CLEAR_ALL_CART_ITEMS_FAIL'
}

export class GetAllCartItem implements Action {
    readonly type = CartActionTypes.GET_ALL_CART_ITEMS;
    constructor() { }
}

export class GetAllCartItemSucess implements Action {
    readonly type = CartActionTypes.GET_ALL_CART_ITEMS_SUCESS;
    constructor(public items: CartItem[]) { }
}

export class GetAllCartItemFail implements Action {
    readonly type = CartActionTypes.GET_ALL_CART_ITEMS_FAIL;
    constructor(public message: string) { }
}

export class AddCartItem implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM;
    constructor(public item: CartItem) { }
}

export class AddCartItemSucess implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM_SUCESS;
    constructor(public item: CartItem) { }
}

export class AddCartItemFail implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM_FAIL;
    constructor(public message: string) { }
}


export class RemoveCartItem implements Action {
    readonly type = CartActionTypes.REMOVE_CART_ITEM;
    constructor(public id: number) { }
}

export class RemoveCartItemSucess implements Action {
    readonly type = CartActionTypes.REMOVE_CART_ITEM_SUCESS;
    constructor(public id: number) { }
}

export class RemoveCartItemFail implements Action {
    readonly type = CartActionTypes.REMOVE_CART_ITEM_FAIL;
    constructor(public message: string) { }
}


export class ClearAllCartItem implements Action {
    readonly type = CartActionTypes.CLEAR_ALL_CART_ITEMS;
    constructor() { }
}

export class ClearAllCartItemSucess implements Action {
    readonly type = CartActionTypes.CLEAR_ALL_CART_ITEMS_SUCESS;
    constructor() { }
}

export class ClearAllCartItemFail implements Action {
    readonly type = CartActionTypes.CLEAR_ALL_CART_ITEMS_FAIL;
    constructor(public message: string) { }
}

export type Actions = GetAllCartItem | GetAllCartItemSucess | GetAllCartItemFail | AddCartItem | AddCartItemSucess | AddCartItemFail |
    RemoveCartItem | RemoveCartItemSucess | RemoveCartItemFail | ClearAllCartItem | ClearAllCartItemSucess | ClearAllCartItemFail;



