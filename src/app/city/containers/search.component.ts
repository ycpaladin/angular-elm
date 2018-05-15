import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CityHistory } from '../models/city';
import { Store, select } from '@ngrx/store';
import * as fromCity from '../reducers';
import { SearchPosition, ClearSearchPosition, ClearHistoryList, GetSearchHistoryList } from '../actions/search.action';
import { ActivatedRoute } from '@angular/router';
import { ChangeCity } from '../actions/home.actions';

@Component({
  selector: 'app-city-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {


  inputVaule: string;
  historytitle: boolean;
  cityname: Observable<string>;
  placelist: Observable<CityHistory[]>;
  placeNone: boolean;

  routeParamSub$: Subscription;
  constructor(private store$: Store<fromCity.State>, private router$: ActivatedRoute) {
    this.cityname = this.store$.pipe(select(fromCity.getGuessCityName));
    this.placelist = this.store$.pipe(select(fromCity.getPositionList));
    this.historytitle = true;
  }

  ngOnInit() {
    this.store$.dispatch(new GetSearchHistoryList());
    this.routeParamSub$ = this.router$.params.subscribe(p => {
      this.store$.dispatch(new ChangeCity(p['id']));
    });
  }

  clearAll() {
    this.store$.dispatch(new ClearHistoryList());
  }

  postpois($event) {
    if (this.inputVaule) {
      this.historytitle = false;
      this.store$.dispatch(new SearchPosition(this.inputVaule));
    } else {
      this.historytitle = true;
      this.store$.dispatch(new ClearSearchPosition());
    }
  }

  ngOnDestroy(): void {
    this.store$.dispatch(new ClearSearchPosition());
    this.routeParamSub$.unsubscribe();
  }

}
