import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Shop } from '../models';

import { eleServerUrl } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http$: HttpClient) { }

    // /v2/index_entry
    getCategories(geohash: string, group_type: string = '1'): Observable<Category[]> {
        return this.http$.get<Category[]>(`${eleServerUrl}/v2/index_entry`, {
            params: {
                geohash,
                group_type
            }
        });
    }
    // https://elm.cangdu.org/shopping/restaurants?latitude=31.22299&longitude=121.36025
    // &offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=
    searchShop(
        // [latitude: string,
        //     longitude: string]
        geohash: string,
        keyword: string = '',
        offset: string = '0 ',
        limit: string = '20',
        restaurant_category_id: string = '',
        order_by: string = '',
        delivery_mode: string[] = [],
        extras: string[] = [],
        restaurant_category_ids: string[] = []
    ): Observable<Shop[]> {
        const [latitude, longitude] = geohash.split(',');
        return this.http$.get<Shop[]>(`${eleServerUrl}/shopping/restaurants`, {
            params: {
                latitude,
                longitude,
                keyword,
                offset,
                limit,
                restaurant_category_id,
                delivery_mode,
                extras,
                restaurant_category_ids
            }
        });
    }

}
