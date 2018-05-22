import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ShopDetials, ShopCategory } from '../../models';
import { imgBaseUrl } from '../../../../environments/environment';
import 'better-scroll';
declare let BScroll: BScrollStatic;

@Component({
    selector: 'app-shop-food',
    templateUrl: './shop-food.component.html',
    styleUrls: ['./shop-food.component.scss']
})
export class ShopFoodComponent implements OnInit, OnChanges {


    @ViewChild('wrapperMenu') wrapperMenu: ElementRef;
    @ViewChild('menuFoodList') menuFoodList: ElementRef;
    @Input() menuList: ShopCategory[];
    @Input() shopCart: any;

    i = 0;
    categoryNum: any[];
    menuIndex = 0;
    cartFoodList: any[];
    totalPrice: number;
    titleDetailIndex: number;
    imgBaseUrl = imgBaseUrl;
    totalNum: number;
    deliveryFee: number;
    minimumOrderAmount: number;
    shopListTop: any[];
    foodScroll: BScroll;
    menuIndexChange = true;
    constructor() {
        this.shopListTop = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.menuList && !changes.menuList.firstChange) {
            this.initCategoryNum();
            setTimeout(() => {
                const listContainer: HTMLElement = this.menuFoodList.nativeElement;
                if (!listContainer.children[0].children.length) {
                    return;
                }
                const listArr = Array.from(listContainer.children[0].children);
                this.shopListTop = listArr.map((item: HTMLElement) => item.offsetTop);
                this.listenScroll(listContainer);
            }, 20);
        }
        console.log('changes=>', changes);

    }


    ngOnInit() {

    }



    listenScroll(element) {
        console.log('@', element);
        this.foodScroll = new BScroll(element, {
            probeType: 3,
            deceleration: 0.001,
            bounce: false,
            swipeTime: 2000,
            click: true,
        });

        const wrapperMenu = new BScroll(this.wrapperMenu.nativeElement, {
            click: true,
        });

        const wrapMenuHeight = this.wrapperMenu.nativeElement.clientHeight;
        this.foodScroll.on('scroll', (pos) => {
            if (!this.wrapperMenu.nativeElement) {
              return;
            }
            this.shopListTop.forEach((item, index) => {
              if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                this.menuIndex = index;
                const menuList = this.wrapperMenu.nativeElement.querySelectorAll('.activity_menu');
                const el = menuList[0];
                wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
              }
            });
        });
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
