import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShopDetials, CartFood, ShopCommData } from '../../models';
import { sumBy } from 'lodash';
import { CartItem } from '../../models/cart';

@Component({
    selector: 'app-shop-buy-car',
    templateUrl: './shop-buy-car.component.html',
    styleUrls: ['./shop-buy-car.component.scss']
})
export class ShopBuyCarComponent implements OnInit {

    titleDetailIndex: number;
    showCartList: boolean;
    receiveInCart: boolean;

    @Input() shopDetailData: ShopDetials;
    @Input() shopCommData: ShopCommData;
    @Input() totalPrice: number;
    @Output() clearCart = new EventEmitter<void>();
    @Output() removeOutCart = new EventEmitter<number>();
    @Output() addToCart = new EventEmitter<CartItem>();
    constructor() { }

    get minimumOrderAmount(): number {
        if (this.shopDetailData) {
            return this.shopDetailData.float_minimum_order_amount - this.shopCommData.totalPrice;
        } else {
            return null;
        }
    }

    get totalNum() {
        // this.shopCommData.cartFoodList.forEach
        const num = sumBy(this.shopCommData.cartFoodList, t => t.num);
        return num;
    }

    ngOnInit() {
    }

    _clearCart() {
        this.clearCart.next();
    }

    _removeOutCart(item_id: number) {
        this.removeOutCart.next(item_id);
    }

    _addToCart(item: CartFood) {
        const { item_id, category_id, food_id, price, name, specs } = item;
        const _item: CartItem = {
            shopId: this.shopDetailData.id,
            item_id,
            food_id,
            category_id,
            packing_fee: 0,
            sku_id: 0,
            stock: 0,
            name,
            price,
            specs
        };
        this.addToCart.next(_item);
    }

    toggleCartList() {
        this.showCartList = !this.showCartList;
    }
}
