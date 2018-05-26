import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ShopDetials, ShopCategory, Food, ShopCommData } from '../../models';
import 'better-scroll';
import { CartItem } from '../../models/cart';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromOrder from '../../reducers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClearAllCartItem, AddCartItem, RemoveCartItem } from '../../actions/cart.action';

declare let BScroll: BScrollStatic;

@Component({
    selector: 'app-shop-food',
    templateUrl: './shop-food.component.html',
    styleUrls: ['./shop-food.component.scss']
})
export class ShopFoodComponent implements OnInit, OnChanges {


    @ViewChild('wrapperMenu') wrapperMenu: ElementRef;
    @ViewChild('menuFoodList') menuFoodList: ElementRef;
    // shopDetailData: Observable<ShopDetials>;
    menuList: Observable<ShopCategory[]>;
    shopCommData: Observable<ShopCommData>;
    shoppingCart: Observable<CartItem[]>;
    // totalPrice: Observable<number>;
    // showLoading: Observable<boolean>;

    // @Input() menuList: ShopCategory[];
    // @Input() shopCart: CartItem[];
    @Input() shopDetailData: ShopDetials;
    @Input() showLoading: boolean;

    // @Input() shopCommData: ShopCommData;
    i = 0;
    // categoryNum: any[];
    menuIndex = 0;
    // cartFoodList: any[];
    // totalPrice: number;
    titleDetailIndex: number;
    deliveryFee: number;
    minimumOrderAmount: number;
    shopListTop: number[];
    foodScroll: BScroll;
    menuIndexChange = true;
    // shopId: Observable<string>;
    constructor(public router$: ActivatedRoute, private store$: Store<fromOrder.State>) {
        this.shopListTop = [];
        // this.shopDetailData = this.store$.pipe(select(fromOrder.getShopDetials));
        // this.shopId = this.store$.pipe(select(fromOrder.getShopId));
        this.menuList = this.store$.pipe(select(fromOrder.getShopCategories));
        this.shoppingCart = this.store$.pipe(select(fromOrder.getCartItems));
        this.shopCommData = this.store$.pipe(select(fromOrder.getShopCommData));
        // this.totalPrice = this.store$.pipe(select(fromOrder.getTotalPrice));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.shopDetailData && changes.shopDetailData.firstChange) {
            setTimeout(() => {
                const listContainer: HTMLElement = this.menuFoodList.nativeElement;
                if (!listContainer.children[0].children.length) {
                    return;
                }
                const listArr = Array.from(listContainer.children[0].children);
                this.shopListTop = listArr.map((item: HTMLElement) => item.offsetTop);
                this.listenScroll(listContainer);
            }, 0);
        }
    }


    ngOnInit() {

    }



    listenScroll(element) {
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


    showTitleDetail(index: number) {

    }

    chooseMenu(index: number) {
        this.menuIndex = index;
        this.menuIndexChange = false;
        this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
        this.foodScroll.on('scrollEnd', () => {
            this.menuIndexChange = true;
        });
    }

    clearCart() {
        this.store$.dispatch(new ClearAllCartItem());
    }

    removeOutCart(item: CartItem) {
        // console.log(item);
        this.store$.dispatch(new RemoveCartItem(item.item_id));
    }

    addToCart(item: CartItem) {
        // console.log(item);
        this.store$.dispatch(new AddCartItem(item));
    }

    showMoveDot(item: { showMoveDot: boolean[], elLeft: number, elBottom: number }) {
        console.log(item);
    }

    showReduceTip() {
        console.log('showReduceTip');
    }

    showChooseList(foods: Food) {
        console.log(foods);
    }

    toggleCartList() {

    }
}
