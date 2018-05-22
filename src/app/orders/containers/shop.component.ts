import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromOrder from '../reducers';
import { Store, select } from '@ngrx/store';
import { Location } from '@angular/common';
import { imgBaseUrl } from '../../../environments/environment';
import { ShopDetials, ShopCategory } from '../models';
import { LoadShopData } from '../actions/shop.action';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {


  imgBaseUrl = imgBaseUrl;

  showLoading: Observable<boolean>;
  error: Observable<boolean>;
  message: Observable<string>;
  shopDetailData: Observable<ShopDetials>;
  menuList: Observable<ShopCategory[]>;
  changeShowType = 'food';

  routerSub$: Subscription;
  constructor(private store$: Store<fromOrder.State>, private location$: Location, private router$: ActivatedRoute) {
    this.showLoading = this.store$.pipe(select(fromOrder.getFetching));
    this.error = this.store$.pipe(select(fromOrder.getError));
    this.message = this.store$.pipe(select(fromOrder.getMessage));

    this.shopDetailData = this.store$.pipe(select(fromOrder.getShopDetials));
    this.menuList = this.store$.pipe(select(fromOrder.getShopCategories));

    this.shopDetailData.subscribe(d => console.log(d));

  }

  ngOnInit() {
    this.routerSub$ = this.router$.params.subscribe(p => {
      console.log(p);
      this.store$.dispatch(new LoadShopData(p['id']));
    });
  }

  goback() {
    this.location$.back();
  }

  showActivitiesFun() {

  }

  ngOnDestroy(): void {
    this.routerSub$.unsubscribe();
  }
}
