import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Food } from '../../models';
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
    @Output() removeOutCart = new EventEmitter<CartItem>();
    /**
     * 添加到购物车
     */
    @Output() addToCart = new EventEmitter<CartItem>();
    @Output() showMoveDot = new EventEmitter<{ showMoveDot: boolean[], elLeft: number, elBottom: number }>();
    @Output() showChooseList = new EventEmitter<Food>();
    @Output() showReduceTip = new EventEmitter<void>();
    @Input() foods: Food;
    @Input() shopId: string;
    @Input() shopCart: CartItem[];
    _showMoveDot = [];
    constructor() { }

    ngOnInit() {
    }

    get foodNum(): number {
        // const category_id = this.foods.category_id;
        const item_id = this.foods.item_id;


        // const x = countBy(this.shopCart, (item: CartItem) => item.item_id === item_id);
        const num = this.shopCart.filter(t => t.item_id === item_id).length;
        return num;
        // if (this.shopCart && this.shopCart[item_id]) {
        //     let num = 1;
        //     // Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
        //     //     num += item.num;
        //     // });
        //     return num;
        // } else {
        //     return 0;
        // }

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
