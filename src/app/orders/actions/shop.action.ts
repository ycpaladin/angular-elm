import { Action } from '@ngrx/store';
import { ShopCategory, ShopRating, ShopScore, ShopTag, ShowDetials } from '../models';

export enum ShopActionTypes {
  LOAD_SHOP_DATA = '[Shop] LOAD_SHOP_DATA',
  LOAD_SHOP_DATA_SUCESS = '[Shop] LOAD_SHOP_DATA_SUCESS',
  LOAD_SHOP_DATA_FAIL = '[Shop] LOAD_SHOP_DATA_FAIL',

  LOAD_SHOP_RATING = '[Shop] LOAD_SHOP_RATING',
  LOAD_SHOP_RATING_SUCESS = '[Shop] LOAD_SHOP_RATING_SUCESS',
  LOAD_SHOP_RATING_FAIL = '[Shop] LOAD_SHOP_RATING_FAIL',

  LOAD_SHOP_SCORES = '[Shop] LOAD_SHOP_SCORES',
  LOAD_SHOP_SCORES_SUCESS = '[Shop] LOAD_SHOP_SCORES_SUCESS',
  LOAD_SHOP_SCORES_FAIL = '[Shop] LOAD_SHOP_SCORES_FAIL',

  LOAD_SHOP_TAGS = '[Shop] LOAD_SHOP_TAGS',
  LOAD_SHOP_TAGS_SUCESS = '[Shop] LOAD_SHOP_TAGS_SUCESS',
  LOAD_SHOP_TAGS_FAIL = '[Shop] LOAD_SHOP_TAGS_FAIL',
}


export class LoadShopData implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_DATA;
  /**
   * 加载商家的外卖
   * @param restaurant_id 商家ID
   * @param refresh 从服务端加载
   */
  constructor(public restaurant_id: string, public refreshFromServer: boolean = true) { }
}

export class LoadShopDataSucess implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_DATA_SUCESS;
  constructor(public data: { categories: ShopCategory[], detials: ShowDetials }) { }
}

export class LoadShopDataFail implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_DATA_FAIL;
  constructor(public message: string) { }
}

export class LoadShopRatings implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_RATING;
  constructor() { }
}

export class LoadShopRatingsSucess implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_RATING_SUCESS;
  constructor(public data: ShopRating[]) { }
}

export class LoadShopRatingsFail implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_RATING_FAIL;
  constructor(public message: string) { }
}

export class LoadShopScores implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_SCORES;
  constructor() { }
}

export class LoadShopScoresSucess implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_SCORES_SUCESS;
  constructor(public data: ShopScore) { }
}

export class LoadShopScoresFail implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_SCORES_FAIL;
  constructor(public message: string) { }
}

export class LoadShopTags implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_TAGS;
  constructor() { }
}

export class LoadShopTagsSucess implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_TAGS_SUCESS;
  constructor(public data: ShopTag[]) { }
}

export class LoadShopTagsFail implements Action {
  readonly type = ShopActionTypes.LOAD_SHOP_TAGS_FAIL;
  constructor(public message: string) { }
}




export type Actions = LoadShopData | LoadShopDataSucess | LoadShopDataFail
  | LoadShopRatings | LoadShopRatingsSucess | LoadShopRatingsFail
  | LoadShopScores | LoadShopScoresSucess | LoadShopScoresFail
  | LoadShopTags | LoadShopTagsSucess | LoadShopTagsFail;

