import { Component, OnInit, Input } from '@angular/core';
import { ShopDetials, ShopCategory } from '../../models';
import { imgBaseUrl } from '../../../../environments/environment';

@Component({
    selector: 'app-shop-food',
    templateUrl: './shop-food.component.html',
    styleUrls: ['./shop-food.component.scss']
})
export class ShopFoodComponent implements OnInit {

    @Input() menuList: ShopCategory[];
    @Input() shopCart: any;
    categoryNum: any[];
    menuIndex: number;
    cartFoodList: any[];
    totalPrice: number;
    titleDetailIndex: number;
    imgBaseUrl = imgBaseUrl;
    totalNum: number;
    deliveryFee: number;
    minimumOrderAmount: number;
    constructor() { }

    ngOnInit() {
        this.initCategoryNum();
    }

    initCategoryNum() {
        const newArr = [];
        let cartFoodNum = 0;
        this.totalPrice = 0;
        this.cartFoodList = [];
        this.menuList.forEach((item, index) => {
            if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
                let num = 0;
                Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
                    Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                        const foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
                        num += foodItem.num;
                        if (item.type === 1) {
                            this.totalPrice += foodItem.num * foodItem.price;
                            if (foodItem.num > 0) {
                                this.cartFoodList[cartFoodNum] = {};
                                this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                                this.cartFoodList[cartFoodNum].item_id = itemid;
                                this.cartFoodList[cartFoodNum].food_id = foodid;
                                this.cartFoodList[cartFoodNum].num = foodItem.num;
                                this.cartFoodList[cartFoodNum].price = foodItem.price;
                                this.cartFoodList[cartFoodNum].name = foodItem.name;
                                this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                                cartFoodNum++;
                            }
                        }
                    });
                });
                newArr[index] = num;
            } else {
                newArr[index] = 0;
            }
        });
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
        this.categoryNum = [...newArr];
    }

    showTitleDetail(index: number) {

    }

    chooseMenu(index: number) {

    }

    getImgPath(path) {

    }

    clearCart() {

    }

    removeOutCart() {

    }

    addToCart() {

    }

    toggleCartList() {

    }
}
