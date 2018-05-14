import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { PositionWithId, Position } from '../models';
import { IndexDbBaseService } from '../../services/indexDb.service';
import { Observable } from 'rxjs';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private table: Dexie.Table<PositionWithId, number>;
  constructor(private db$: IndexDbBaseService) {
    this.table = this.db$.table('position');
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
