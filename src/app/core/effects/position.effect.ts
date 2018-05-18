import { Injectable } from '@angular/core';
import { PositionService } from '../services/position.service';
import * as fromRouter from '@ngrx/router-store';
import { Effect } from '@ngrx/effects';
import { defer } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { LoadPosition, LoadPositionSucess } from '../actions/position.action';

@Injectable({
  providedIn: 'root'
})
export class PositionEffect {

  constructor(
    private positionService$: PositionService,
    private router$: Router,
    private store$: Store<fromRoot.State>) { }


  @Effect({ dispatch: false }) defer$ = defer(() => this.positionService$.getPositionFromLocalDefault().pipe(
    tap(p => {
      if (p !== null) {
        this.store$.dispatch(new LoadPositionSucess(p));
      } else {
        if (this.router$.url.indexOf('/msite/home') === -1) {
          this.router$.navigate(['/city']);
        }
      }
    })
  ));
}
