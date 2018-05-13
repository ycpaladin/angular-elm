import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityHistory, CityHistoryWithId } from '../models/city';
import { CityHistoryService } from './city-history.service';
import { Dexie } from 'dexie';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private table: Dexie.Table<CityHistoryWithId, number>;

    constructor(private $http: HttpClient, private $db: CityHistoryService) {
        this.table = this.$db.table('cityHistory');
    }

    getSearchHistory(): Observable<CityHistory[]> {
        return new Observable<CityHistory[]>(observer => {
            this.table.toArray().then((value) => {
                observer.next(value);
            }).catch(e => {
                observer.error(e);
            });
            return () => { };
        });
    }

    add(data: CityHistory[]): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.bulkAdd(<CityHistoryWithId[]>data).then(() => {
                observer.next(true);
            }).catch(e => {
                observer.error(e);
            });
            return () => { };
        });
    }

    clear(id): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.clear().then(() => {
                observer.next(true);
            }).catch(e => {
                observer.error(e);
            });
            return () => { };
        });
    }
}
