import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { eleServerUrl } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { City, CityGroup, LocalStoreageCity } from '../models/home';
import { reduce } from 'lodash';
import Dexie from 'dexie';
import { mergeMap, map } from 'rxjs/operators';
import { IndexDbBaseService } from '../../services/indexDb.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private table: Dexie.Table<LocalStoreageCity, number>;

  constructor(private http: HttpClient, private db$: IndexDbBaseService) {
    this.table = this.db$.table('cityGroup');
    // this.table.
    // this.db$.
  }

  getGuessCity(): Observable<City> {
    return this.http.get<City>(`${eleServerUrl}/cities?type=guess`);
  }

  getHotCities(): Observable<City[]> {
    return this.http.get<City[]>(`${eleServerUrl}/cities?type=hot`);
  }

  /**
   * 获取城市分组，先从IndexDb中获取，如果没有则从服务端中获取
   */
  getCityGroup(): Observable<CityGroup> {
    return this.getCityGroupFromLocal().pipe(
      mergeMap(
        d => d !== null ?
          of(d) :
          this.http.get<CityGroup>(`${eleServerUrl}/cities?type=group`))
    );
  }

  /**
   * 保持城市分组到indexDb中, 如果indexDb中已经存在则不会保存
   * @param data 城市分组
   */
  saveToLocal(data: CityGroup) {
    this.table.count().then(count => {
      if (count === 0) {
        const array = Object.keys(data).map((key): LocalStoreageCity => ({ key, cities: data[key] }));
        this.table.bulkAdd(array);
      }
    });
  }


  /**
   * 从IndexDb中获取城市分组
   */
  getCityGroupFromLocal(): Observable<CityGroup> {
    return new Observable(observer => {
      this.table.toArray().then(array => {
        if (array.length > 0) {
          const cityGroup = {};
          array.forEach(({ key, cities }) => {
            cityGroup[key] = cities;
          });
          observer.next(cityGroup);
        } else {
          // observer.
          observer.next(null);
        }
        observer.complete();
      });
      return () => { };
    });
  }
}
