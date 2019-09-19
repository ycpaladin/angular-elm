import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopCategory, ShopRating, ShopTag, ShopScore, ShopDetials } from '../models';
import { eleServerUrl } from '../../../environments/environment';

const defaultExtra = ['activities', 'album', 'license', 'identification', 'statistics'];

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http$: HttpClient) { }

  getShopDetails(restaurantId: number, latitude: string, longitude: string, extras: string[] = defaultExtra): Observable<ShopDetials> {
    // https://elm.cangdu.org/shopping/restaurant/1
    // ?latitude=45.7814&longitude=126.70353&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics
    return this.http$.get<ShopDetials>(`${eleServerUrl}/shopping/restaurant/${restaurantId}`, {
      params: {
        latitude,
        longitude,
        extras
      }
    });
  }

  /**
   * 获取商家销售的所有外卖
   * @param restaurantId 商家ID
   */
  getShopCategories(restaurantId: number): Observable<ShopCategory[]> {
    return this.http$.get<ShopCategory[]>(`${eleServerUrl}/shopping/v2/menu`, {
      params: {
        restaurantId: restaurantId + ''
      }
    });
  }

  /**
   * 获取商家评论
   * @param restaurantId 商家ID
   * @param hasContent ？默认为true字符串
   * @param offset 默认为0
   * @param limit 默认为10
   * @param tagName 标签名称?
   */
  getRatings(
    restaurantId: number,
    hasContent: string = 'true',
    offset: string = '0',
    limit: string = '10',
    tagName: string = ''): Observable<ShopRating[]> {
    return this.http$.get<ShopRating[]>(`${eleServerUrl}/ugc/v2/restaurants/${restaurantId}/ratings`, {
      params: {
        hasContent,
        offset,
        limit,
        tagName
      }
    });
  }

  /**
   * 获取商家标签
   * @param restaurantId 商家ID
   */
  getTags(restaurantId: number): Observable<ShopTag[]> {
    return this.http$.get<ShopTag[]>(`${eleServerUrl}/ugc/v2/restaurants/${restaurantId}/ratings/tags`);
  }

  /**
   * 获取商家评分
   * @param restaurantId 商家ID
   */
  getScores(restaurantId: number): Observable<ShopScore> {
    return this.http$.get<ShopScore>(`${eleServerUrl}/ugc/v2/restaurants/${restaurantId}/ratings/scores`);
  }



}
