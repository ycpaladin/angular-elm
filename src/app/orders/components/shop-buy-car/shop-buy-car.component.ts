import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShopDetials } from '../../models';

@Component({
    selector: 'app-shop-buy-car',
    templateUrl: './shop-buy-car.component.html',
    styleUrls: ['./shop-buy-car.component.scss']
})
export class ShopBuyCarComponent implements OnInit {
    cartFoodList: any[];
    totalPrice = 0;
    titleDetailIndex: number;
    totalNum: number;
    deliveryFee: number;
    // minimumOrderAmount: number;
    showCartList: boolean;
    receiveInCart: boolean;

    @Input() shopDetailData: ShopDetials;
    @Output() clearCart = new EventEmitter<void>();
    constructor() { }


    get minimumOrderAmount(): number {
        if (this.shopDetailData) {
            return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
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
