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
      }).finally(() => {
        observer.complete();
      });
      return () => { };
    });
  }

  add(data: CityHistory): Observable<boolean> {
    console.log('====================>');
    return new Observable<boolean>(observer => {
      this.table.filter(t => t.geohash === data.geohash).first().then(t => {
        if (!t) {
          this.table.add(<CityHistoryWithId>data).then(() => {
            observer.next(true);
          });
        } else {
          observer.next(true);
        }
      }).catch(e => {
        console.log('add to cityHistory error:', e);
        observer.error(e);
      }).finally(() => {
        console.log('1==>1');
        observer.complete();
      });
      return () => {

      };
    });
  }

  clear(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.table.clear().then(() => {
        observer.next(true);
      }).catch(e => {
        observer.error(e);
      }).finally(() => {
        observer.complete();
      });
      return () => { };
    });
  }

}
