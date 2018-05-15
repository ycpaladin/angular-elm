import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CityHistoryWithId, CityHistory } from '../city/models/city';
import { IndexDbBaseService } from './indexDb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityHistoryService {
  private table: Dexie.Table<CityHistoryWithId, number>;
  constructor(private $db: IndexDbBaseService) {
    this.table = this.$db.table('cityHistory');
  }

  getSearchHistory(): Observable<CityHistory[]> {
    return new Observable<CityHistory[]>(observer => {
      this.table.toArray().then((value) => {
        observer.next(value);

      }).catch(e => {
        observer.error(e);
      }).finally(() => observer.complete());
      return () => { };
    });
  }

  add(data: CityHistory): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.table.add(<CityHistoryWithId>data).then(() => {
        observer.next(true);
      }).catch(e => {
        observer.error(e);
      }).finally(() => observer.complete());
      return () => { };
    });
  }

  clear(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.table.clear().then(() => {
        observer.next(true);
      }).catch(e => {
        observer.error(e);
      }).finally(() => observer.complete());
      return () => { };
    });
  }

}
