import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromOrder from '../reducers';
import { Store, select } from '@ngrx/store';
import { Location } from '@angular/common';
import { imgBaseUrl } from '../../../environments/environment';
import { ShopDetials } from '../models';
@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    imgBaseUrl = imgBaseUrl;

    showLoading: Observable<boolean>;
    error: Observable<boolean>;
    message: Observable<string>;
    shopDetailData: Observable<ShopDetials>;
    changeShowType = 'food';
    constructor(private store$: Store<fromOrder.State>, private location$: Location) {
        this.showLoading = this.store$.pipe(select(fromOrder.getFetching));
        this.error = this.store$.pipe(select(fromOrder.getError));
        this.message = this.store$.pipe(select(fromOrder.getMessage));

        this.shopDetailData = this.store$.pipe(select(fromOrder.getShopDetials));



    }

    ngOnInit() {
    }

    goback() {
        this.location$.back();
    }

    showActivitiesFun() {

    }
}
