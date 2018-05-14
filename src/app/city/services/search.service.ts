import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityHistory, CityHistoryWithId } from '../models/city';
import { Dexie } from 'dexie';
import { eleServerUrl } from '../../../environments/environment';
import { IndexDbBaseService } from '../../services/indexDb.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private table: Dexie.Table<CityHistoryWithId, number>;

  constructor(private $http: HttpClient, private $db: IndexDbBaseService) {
    this.table = this.$db.table('cityHistory');
  }

  searchPosition(city_id: string, keyword: string, type: string = 'search'): Observable<CityHistory[]> {
    return this.$http.get<CityHistory[]>(`${eleServerUrl}/pois`, {
      params: {
        type,
        keyword,
        city_id,
      }
    });
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

  clear(): Observable<boolean> {
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
