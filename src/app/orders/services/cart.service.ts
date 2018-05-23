import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CartItem } from '../models/cart';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private table: Dexie.Table<CartItem, number>;
    constructor(private $db: IndexDbBaseService) {
        this.table = this.$db.table('shoppingCart');
    }


    getAll(shopId: string): Observable<CartItem[]> {
        return new Observable<CartItem[]>(observer => {
            this.table.filter(t => t.shopId === shopId).toArray().then(d => {
                observer.next(d);
            }).catch(e => observer.error(e)).finally(() => observer.complete());
            return () => { };
        });
    }

    addOne(item: CartItem): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.add(item).then(() => {
                observer.next(true);
            }).catch(e => observer.error(e)).finally(() => observer.complete());
            return () => { };
        });
    }

    addOneAndGetAll(item: CartItem): Observable<CartItem[]> {
        return forkJoin([this.addOne(item), this.getAll(item.shopId)]).pipe(
            map(([, items]) => items)
        );
    }

    removeOne(id: number): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.delete(id).then(() => {
                observer.next(true);
            }).catch(e => observer.error(e)).finally(() => observer.complete());
            return () => { };
        });
    }

    removeOneAndGetAll(id: number, shopId: string): Observable<CartItem[]> {
        return forkJoin([this.removeOne(id), this.getAll(shopId)]).pipe(
            map(([, items]) => items)
        );
    }

    clearAll(shopId: string): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.filter(t => t.shopId === shopId).delete().then(() => {
                observer.next(true);
            }).catch(e => observer.error(e)).finally(() => observer.complete());
            return () => { };
        });
    }


}
