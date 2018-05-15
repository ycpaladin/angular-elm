import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shop, Support } from '../../models';

import { imgBaseUrl } from '../../../../environments/environment';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit, OnChanges {


  @Input() geohash: string;
  @Input() shopListArr: Shop[];
  @Input() showLoading: boolean;
  imgBaseUrl: string;
  touchend: boolean;
  showBackStatus: boolean;
  constructor() {
    this.imgBaseUrl = imgBaseUrl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
  }

  backTop() {

  }

  zhunshi(supports: Support[]): boolean {
    let zhunStatus = false;
    if ((supports instanceof Array) && supports.length) {
      supports.forEach(item => {
        if (item.icon_name === '准') {
          zhunStatus = true;
        }
      });
    }
    return zhunStatus;
  }

}
