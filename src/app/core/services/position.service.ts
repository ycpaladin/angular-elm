import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { mergeMap } from 'rxjs/operators';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { PositionWithId, Position } from '../models';
import { eleServerUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private table: Dexie.Table<PositionWithId, number>;
  constructor(private db$: IndexDbBaseService, private http$: HttpClient) {
    this.table = this.db$.table('position');
  }

  getPosition(geohash: string): Observable<Position> {
    return this.getPositionFromLocal(geohash)
      .pipe(
        mergeMap(p => {
          // p !== null ? of(p) : this.getPositionFromServer(geohash)
          if (p !== null) {
            return of(p);
          } else {
            return this.getPositionFromServer(geohash);
          }
        })
      );
  }

  getPositionFromServer(geohash: string): Observable<Position> {
    return this.http$.get<Position>(`${eleServerUrl}/v2/pois/${geohash}`);
  }


  saveToLocal(position: Position): Observable<boolean> {
    console.log('===>saveToLocal');
    return new Observable<boolean>(observer => {
      this.table.filter(t => t.geohash === position.geohash).first().then(d => {
        if (!d) {
          this.table.clear().then(() => {
            this.table.add(position as PositionWithId).then(() => {
              observer.next(true);
            });
          });
        } else {
          observer.next(true);
        }
      }).catch(e => {
        console.error('saveToLocal position error:', e);
        observer.error(e);
      }).finally(() => {
        console.log('saveToLocal complated!');
        // observer.complete();
      });
      return () => { };
    });
  }

  getPositionFromLocalDefault(): Observable<Position> {
    return new Observable<Position>(observer => {
      this.table.limit(1).first().then(d => {
        if (d) {
          observer.next(d);
        } else {
          observer.next(null);
        }
      }).catch(e => {
        console.error('getPositionFromLocalDefault position error:', e);
        observer.error(e);
      }).finally(() => {
        observer.complete();
      });
      return () => { };
    });
  }

  getPositionFromLocal(geohash: string): Observable<Position> {
    return new Observable<Position>(observer => {
      this.table.filter(t => t.geohash === geohash).first().then(d => {
        if (d) {
          observer.next(d);
        } else {
          observer.next(null);
        }
      }).catch(e => {
        console.error('getPositionFromLocal position error:', e);
        observer.error(e);
      }).finally(() => {
        // observer.complete();
      });
      return () => { };
    });
  }

}
