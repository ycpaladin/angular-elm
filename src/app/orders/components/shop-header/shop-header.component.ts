import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { imgBaseUrl } from '../../../../environments/environment';
import { ShopDetials } from '../../models';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent implements OnInit, OnChanges {


  imgBaseUrl = imgBaseUrl;
  promotionInfo: string;
  showActivities: boolean;
  @Input() shopDetailData: ShopDetials;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
  }

  showActivitiesFun() {

  }

}
