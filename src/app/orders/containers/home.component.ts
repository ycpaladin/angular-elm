import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { Category, Shop, Position } from '../models';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromOrder from '../reducers';
import { LoadPosition } from '../actions/position.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  imgBaseUrl: string;
//   geohash: string;
  msiteTitle: Observable<string>;
  hasGetData: string;
  foodTypes: Observable<Category[][]>;
  shopListArr: Observable<Shop[]>;
  position: Observable<Position>;
  showLoading: Observable<boolean>;
  routeSub: Subscription;
  constructor(public route$: ActivatedRoute, private store$: Store<fromOrder.State>) {
    this.imgBaseUrl = 'https://fuss10.elemecdn.com';
    this.msiteTitle = this.store$.pipe(select(fromOrder.getPositionName));
    this.foodTypes = this.store$.pipe(select(fromOrder.getHomeCategories));
    this.shopListArr = this.store$.pipe(select(fromOrder.getHomeShopList));
    this.showLoading = this.store$.pipe(select(fromOrder.getHomeFetching));
  }

  ngOnInit() {
    this.routeSub = this.route$.params.subscribe(p => {
      this.store$.dispatch(new LoadPosition(p['geohash']));
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
