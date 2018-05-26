import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShopDetials, CartFood, ShopCommData } from '../../models';

@Component({
    selector: 'app-shop-buy-car',
    templateUrl: './shop-buy-car.component.html',
    styleUrls: ['./shop-buy-car.component.scss']
})
export class ShopBuyCarComponent implements OnInit {

    titleDetailIndex: number;
    // minimumOrderAmount: number;
    showCartList: boolean;
    receiveInCart: boolean;

    @Input() shopDetailData: ShopDetials;
    @Input() shopCommData: ShopCommData;
    @Input() totalPrice: number;
    @Input() totalNum: number;
    @Output() clearCart = new EventEmitter<void>();
    constructor() { }


    get minimumOrderAmount(): number {
        if (this.shopDetailData) {
            return this.shopDetailData.float_minimum_order_amount - this.shopCommData.totalPrice;
        } else {
            return null;
        }
    }

    ngOnInit() {
    }

    _clearCart() {
        this.clearCart.next();
    }

    removeOutCart() {

    }

    addToCart() {

    }

    toggleCartList() {

    }
}
