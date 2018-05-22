import { Component, OnInit, Input } from '@angular/core';
import { ShopDetials, ShopRating, ShopScore, ShopTag } from '../../models';

@Component({
    selector: 'app-shop-rating',
    templateUrl: './shop-rating.component.html',
    styleUrls: ['./shop-rating.component.scss']
})
export class ShopRatingComponent implements OnInit {

    @Input() shopDetailData: ShopDetials;
    @Input() ratingScoresData: ShopScore;
    @Input() ratingTagsList: ShopTag[];
    @Input() ratingList: ShopRating[];
    ratingTageIndex: number;
    constructor() { }

    ngOnInit() {
    }

    changeTgeIndex(index: number, name: string) {

    }

    // getImgPath(path): string {
    //     let suffix;
    //     if (!path) {
    //         return '//elm.cangdu.org/img/default.jpg';
    //     }
    //     if (path.indexOf('jpeg') !== -1) {
    //         suffix = '.jpeg';
    //     } else {
    //         suffix = '.png';
    //     }
    //     const url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    //     return 'https://fuss10.elemecdn.com' + url;
    // }

}
