import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopCategory, ShopRating, ShopTag, ShopScore, ShowDetials } from '../models';
import { eleServerUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http$: HttpClient) { }

  getShopDetails(restaurant_id: string, latitude: string, longitude: string,
    extras: string[] = ['activities', 'album', 'license', 'identification', 'statistics']): Observable<ShowDetials> {
    // https://elm.cangdu.org/shopping/restaurant/1
    // ?latitude=45.7814&longitude=126.70353&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics
    return this.http$.get<ShowDetials>(`${eleServerUrl}/shopping/restaurant/${restaurant_id}`, {
      params: {
        latitude,
        longitude,
        extras
      }
    });
  }

  /**
   * 获取商家销售的所有外卖
   * @param restaurant_id 商家ID
   */
  getShopCategories(restaurant_id: string): Observable<ShopCategory[]> {
    return this.http$.get<ShopCategory[]>(`${eleServerUrl}/shopping/v2/menu`, {
      params: {
        restaurant_id
      }
    });
  }

  /**
   * 获取商家评论
   * @param restaurant_id 商家ID
   * @param has_content ？默认为true字符串
   * @param offset 默认为0
   * @param limit 默认为10
   * @param tag_name 标签名称?
   */
  getRatings(
    restaurant_id: string,
    has_content: string = 'true',
    offset: string = '0',
    limit: string = '10',
    tag_name: string = ''): Observable<ShopRating[]> {
    return this.http$.get<ShopRating[]>(`${eleServerUrl}/ugc/v2/restaurants/${restaurant_id}/ratings`, {
      params: {
        has_content,
        offset,
        limit,
        tag_name
      }
    });
  }

  /**
   * 获取商家标签
   * @param restaurant_id 商家ID
   */
  getTags(restaurant_id: string): Observable<ShopTag[]> {
    return this.http$.get<ShopTag[]>(`${eleServerUrl}/ugc/v2/restaurants/${restaurant_id}/ratings/tags`);
  }

  /**
   * 获取商家评分
   * @param restaurant_id 商家ID
   */
  getScores(restaurant_id: string): Observable<ShopScore> {
    return this.http$.get<ShopScore>(`${eleServerUrl}/ugc/v2/restaurants/${restaurant_id}/ratings/scores`);
  }



}
