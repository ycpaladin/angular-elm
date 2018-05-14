import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { PositionWithId, Position } from '../models';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { eleServerUrl } from '../../../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    private table: Dexie.Table<PositionWithId, number>;
    constructor(private db$: IndexDbBaseService, private http$: HttpClient) {
        this.table = this.db$.table('position');
    }

    getPosition(position: string): Observable<Position> {
        return this.getPositionFromLocal().pipe(
            mergeMap(p => p !== null ? of(p) : this.getPositionFromServer(position))
        );
    }

    getPositionFromServer(position: string): Observable<Position> {
        return this.http$.get<Position>(`${eleServerUrl}/v2/pois/${position}`);
    }


    saveToLocal(position: Position): Observable<boolean> {
        return new Observable(observer => {
            try {
                this.table.clear().then(() => {
                    this.table.add(<PositionWithId>position);
                    observer.next(true);
                    observer.complete();
                });
            } catch (e) {
                observer.error(e);
            }
            return () => { };
        });
    }

    getPositionFromLocal(): Observable<Position> {
        return new Observable(observer => {
            this.table.toArray().then(d => {
                if (d.length > 0) {
                    observer.next(d[0]);
                } else {
                    observer.next(null);
                }
            });
            return () => { };
        });
    }

}
