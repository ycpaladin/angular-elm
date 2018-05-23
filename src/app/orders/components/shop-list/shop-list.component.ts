import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shop, Support } from '../../models';
import { findIndex } from 'lodash';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit, OnChanges {


  @Input() geohash: string;
  @Input() shopListArr: Shop[];
  @Input() showLoading: boolean;
  touchend: boolean;
  showBackStatus: boolean;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }

  backTop() {

  }

  zhunshi(supports: Support[]): boolean {
    let zhunStatus = false;
    if ((supports instanceof Array) && supports.length) {
      // supports.forEach(item => {
      //   if (item.icon_name === '准') {
      //     zhunStatus = true;
      //   }
      // });
      zhunStatus = findIndex(supports, t => t.icon_name === '准') !== -1;
    }
    return zhunStatus;
  }

}
