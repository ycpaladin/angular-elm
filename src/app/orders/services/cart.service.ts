import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CartItem } from '../models/cart';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private table: Dexie.Table<CartItem, number>;
    constructor(private $db: IndexDbBaseService) {
        this.table = this.$db.table('shoppingCart');
    }


    getAll(shopId: number): Observable<CartItem[]> {
        console.log(shopId, typeof shopId);
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
        return this.addOne(item).pipe(
            mergeMap(() => this.getAll(item.shopId))
        );
    }

    removeOne(item_id: number): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.filter(t => t.item_id === item_id).first().then(d => {
                this.table.delete(d.id).then(() => {
                    observer.next(true);
                }).catch(e => observer.error(e)).finally(() => observer.complete());
            });
            return () => { };
        });
    }

    removeOneAndGetAll(item_id: number, shopId: number): Observable<CartItem[]> {
        return this.removeOne(item_id).pipe(
            mergeMap(() => this.getAll(shopId))
        );
    }

    clearAll(shopId: number): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.filter(t => t.shopId === shopId).delete().then(() => {
                observer.next(true);
            }).catch(e => observer.error(e)).finally(() => observer.complete());
            return () => { };
        });
    }


}
