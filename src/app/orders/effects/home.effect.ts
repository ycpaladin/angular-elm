import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, defer, forkJoin, of } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomeActionTypes, LoadDataSucess, LoadDataFail } from '../actions/home.action';
import { PositionActionTypes, LoadPosition } from '../actions/position.action';

// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class HomeEffect {

  constructor(private actions$: Actions, private route$: ActivatedRoute, private service$: HomeService) {
    // this.route$.snapshot.params.subscribe(p => console.log(p));
    console.log(this.route$.snapshot.params);
  }

  @Effect() defer$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPosition>(PositionActionTypes.LOAD_POSITION),
    map(action => action.geohash),
    mergeMap(geohash =>
      forkJoin([this.service$.getCategories(geohash), this.service$.searchShop(geohash)])
        .pipe(
          map(([categories, shopList]) => new LoadDataSucess(categories, shopList)),
      )),
    catchError(e => of(new LoadDataFail(e)))
  );


}
