import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-buy-car',
  templateUrl: './shop-buy-car.component.html',
  styleUrls: ['./shop-buy-car.component.scss']
})
export class ShopBuyCarComponent implements OnInit {
  cartFoodList: any[];
  totalPrice: number;
  titleDetailIndex: number;
  totalNum: number;
  deliveryFee: number;
  minimumOrderAmount: number;
  showCartList: boolean;
  receiveInCart: boolean;

  @Output() clearCart = new EventEmitter();
  constructor() { }

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
