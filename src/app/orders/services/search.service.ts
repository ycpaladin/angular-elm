import { Injectable } from '@angular/core';

import { eleServerUrl } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, merge, of } from 'rxjs';
import Dexie from 'dexie';
import { SearchHistory, SearchItem } from '../models';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService {


    private table: Dexie.Table<SearchHistory, number>;
    constructor(private http$: HttpClient, private db$: IndexDbBaseService) {
        this.table = this.db$.table('searchHistory');
    }

    /**
     * 从服务端获取搜索结果, 获取搜索结果后会顺便保存搜索关键字记录到IndexDb
     * @param geohash 地理位置
     * @param keyword 搜索关键字
     */
    getSearchResult(geohash: string, keyword: string): Observable<SearchItem[]> {
        return this.http$.get<SearchItem[]>(
            `${eleServerUrl}/v4/restaurants?extras[]=restaurant_activity&geohash=${geohash}&keyword=${keyword}&type=search`).pipe(
                mergeMap(d =>
                    this.addSearchHistory(keyword)
                        .pipe(
                            mergeMap(() => of(d))
                        ))
            );
    }

    /**
     * 从IndexDb中获取搜索历史
     */
    getSearchHistory(): Observable<SearchHistory[]> {
        return new Observable<SearchHistory[]>(observer => {
            this.table.toArray().then(d => {
                observer.next(d);
            }).catch(e => {
                console.error('getSearchHistory error:', e);
                observer.error(e);
            }).finally(() => observer.complete());
            return () => { };
        });
    }


    /**
     * 从IndexDb清空所有的搜索历史
     */
    clearSearchHistory(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.table.clear().then(d => {
                observer.next(true);
            }).catch(e => {
                console.error('clearSearchHistory error:', e);
                observer.error(e);
            }).finally(() => observer.complete());
            return () => { };
        });
    }

    /**
     * 添加一个搜索关键词历史记录到IndexDb
     * @param keyword 搜索关键字
     */
    addSearchHistory(keyword: string): Observable<boolean> {
        return new Observable<boolean>(observer => {
            // 保存前会查询本地是否已经包含了该关键词，防止出现重复的关键词
            this.table.filter(t => t.keyword === keyword).toArray().then(d => {
                if (d.length === 0) {
                    this.table.add({ keyword }).then(() => {
                        observer.next(true);
                    });
                } else {
                    observer.next(true);
                }
            }).catch(e => {
                console.error('addSearchHistory error:', e);
                observer.error(e);
            }).finally(() => observer.complete());
            return () => { };
        });
    }

    deleteSearchHistory(id: number): Observable<boolean> {
        return new Observable<boolean>(observer => {
            // 保存前会查询本地是否已经包含了该关键词，防止出现重复的关键词
            this.table.delete(id).then(() => {
                observer.next(true);
            }).catch(e => {
                console.error('deleteSearchHistory error:', e);
                observer.error(e);
            }).finally(() => observer.complete());
            return () => { };
        });
    }
}
