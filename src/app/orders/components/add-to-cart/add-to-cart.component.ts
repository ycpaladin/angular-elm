import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Food } from '../../models';
import { CartItem } from '../../models/cart';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

    @Output() removeOutCart = new EventEmitter<CartItem>();
    @Output() addToCart = new EventEmitter<CartItem>();
    @Output() showMoveDot = new EventEmitter<{ showMoveDot: boolean[], elLeft: number, elBottom: number }>();
    @Output() showChooseList = new EventEmitter<Food>();
    @Output() showReduceTip = new EventEmitter<void>();
    @Input() foods: Food;
    @Input() shopId: string;
    foodNum: number;
    _showMoveDot = [];
    constructor() { }

    ngOnInit() {
    }

    _removeOutCart() {
        if (this.foodNum > 0) {
            const { category_id, item_id, specfoods: [{ food_id, price, packing_fee, sku_id, stock }] } = this.foods;
            const item = {
                shopId: this.shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs: '',
                packing_fee,
                sku_id,
                stock
            };
            this.removeOutCart.next(item);
        }

    }

    _addToCart($event) {
        const { category_id, item_id, specfoods: [{ food_id, price, packing_fee, sku_id, stock }] } = this.foods;
        const item = {
            shopId: this.shopId,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs: '',
            packing_fee,
            sku_id,
            stock
        };
        this.addToCart.next(item);
        const elLeft = $event.target.getBoundingClientRect().left;
        const elBottom = $event.target.getBoundingClientRect().bottom;
        this._showMoveDot.push(true);
        this.showMoveDot.next({
            showMoveDot: this._showMoveDot, elLeft, elBottom
        });
    }

    _showReduceTip() {
        this.showReduceTip.next();
    }

    _showChooseList() {
        this.showChooseList.next(this.foods);
    }
}
