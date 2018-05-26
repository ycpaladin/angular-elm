import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Food, ShopCommData } from '../../models';
import { CartItem } from '../../models/cart';
// import { countBy } from 'lodash';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

    /**
     * 从购物车中移除
     */
    @Output() removeOutCart = new EventEmitter<number>();
    /**
     * 添加到购物车
     */
    @Output() addToCart = new EventEmitter<CartItem>();
    @Output() showMoveDot = new EventEmitter<{ showMoveDot: boolean[], elLeft: number, elBottom: number }>();
    @Output() showChooseList = new EventEmitter<Food>();
    @Output() showReduceTip = new EventEmitter<void>();
    @Input() foods: Food;
    @Input() shopId: number;
    @Input() shopCommData: ShopCommData;
    // @Input() shopCart: CartItem[];
    _showMoveDot = [];
    constructor() { }

    ngOnInit() {
    }

    get foodNum(): number {
        const item_id = this.foods.item_id;
        const cartFood = this.shopCommData.cartFoodList.find(t => t.item_id === item_id);
        const num = (cartFood && cartFood.num) || 0;
        return num;
    }

    _removeOutCart() {
        if (this.foodNum > 0) {
            const { item_id } = this.foods;
            this.removeOutCart.next(item_id);
        }

    }

    _addToCart($event) {
        const { category_id, item_id, specfoods: [{ food_id, price, packing_fee, sku_id, stock }], name, description } = this.foods;
        const item = {
            shopId: this.shopId,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs: description,
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
