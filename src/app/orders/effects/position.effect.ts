import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, defer, forkJoin, of, merge } from 'rxjs';
import { mergeMap, withLatestFrom, map, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HomeActionTypes, LoadDataSucess, LoadDataFail } from '../actions/home.action';
import { PositionService } from '../services/position.service';
import { PositionActionTypes, LoadPositionSucess, LoadPositionFail, LoadPosition } from '../actions/position.action';
import { CityHistoryService } from '../../services/city-history.service';

// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/mergeMap';

@Injectable({
    providedIn: 'root'
})
export class PositionEffect {

    constructor(private actions$: Actions,
        private service$: PositionService,
        private cityHistoryService$: CityHistoryService) {
    }

    @Effect() defer$: Observable<Action> = this.actions$.pipe(
        ofType<LoadPosition>(PositionActionTypes.LOAD_POSITION),
        mergeMap((action) => this.service$.getPosition(action.geohash)
            .pipe(
                map(p => new LoadPositionSucess(p)),
                tap(({ position }) => {
                    //                     address: string;
                    //   city: string;
                    //   geohash: string;
                    //   latitude: string;
                    //   longitude: string;
                    //   name: string;
                    this.service$.saveToLocal(position);
                    const { name, address, latitude, longitude, geohash } = position;
                    this.cityHistoryService$.add([{
                        name, address, latitude, longitude, geohash
                    }]);
                }),
                catchError(e => of(new LoadPositionFail(e)))
            ))
    );
}
