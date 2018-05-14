import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Category, Shop } from '../models';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromOrder from '../reducers';
import { LoadPosition } from '../actions/position.action';
import Swiper from 'swiper';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {


    @ViewChild('swiperContainer') swiperContainer: ElementRef;

    imgBaseUrl: string;
    geohash: string;
    msiteTitle: string;
    hasGetData: string;
    foodTypes: Observable<Category[]>;
    shopListArr: Observable<Shop[]>;

    routeSub: Subscription;
    constructor(public route$: ActivatedRoute, private store$: Store<fromOrder.State>) {
        this.imgBaseUrl = 'https://fuss10.elemecdn.com';
        this.msiteTitle = '请选择地址...';
        this.foodTypes = this.store$.pipe(select(fromOrder.getHomeCategories));
        this.shopListArr = this.store$.pipe(select(fromOrder.getHomeShopList));
    }

    ngOnInit() {
        this.routeSub = this.route$.params.subscribe(p => {
            this.store$.dispatch(new LoadPosition(p['geohash']));
        });


    }

    ngAfterViewInit(): void {
        const x = new Swiper(this.swiperContainer.nativeElement, {
            pagination: '.swiper-pagination',
            loop: true
        });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

}
