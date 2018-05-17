import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, defer, forkJoin, of } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HomeActionTypes, LoadDataSucess, LoadDataFail } from '../actions/home.action';
import { PositionActionTypes, LoadPosition } from '../actions/position.action';
import * as fromRoot from '../../store';
// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class HomeEffect {

  // https://github.com/BioPhoton/angular-ngrx-refactoring.git
  constructor(private actions$: Actions, private rootStore$: Store<fromRoot.State>, private service$: HomeService) {
    // this.route$.snapshot.params.subscribe(p => console.log(p));
    // console.log(this.route$);
  }

  @Effect() defer$: Observable<Action> = defer(() => {
    console.log('==@@=>');
    forkJoin([
      this.rootStore$.pipe(select(fromRoot.getRouteStateParams))
    ]).pipe(tap((p) => {
      console.log(p);
    })).subscribe((d) => {
      console.log(d);
    });
    // withLatestFrom(this.rootStore$.pipe(select(fromRoot.getRouteStateParams)).pipe(
    //   tap((p) => {
    //     console.log(p);
    //   })
    // ));
  });

  @Effect() loadPosition$: Observable<Action> = this.actions$.pipe(
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
