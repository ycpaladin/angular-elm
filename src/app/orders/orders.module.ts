import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home.component';
import { SearchComponent } from './containers/search.component';
import { FoodComponent } from './containers/food.component';
import { ShopComponent } from './containers/shop.component';
import { ConfirmOrderComponent } from './containers/confirm-order.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { DistancePipe } from './pipes/distance.pipe';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './effects/home.effect';
import { HomeService } from './services/home.service';
import { CityHistoryService } from '../services/city-history.service';
import { SearchService } from './services/search.service';
import { SearchEffect } from './effects/search.effect';
import { PositionService } from '../core/services/position.service';
import { ShopService } from './services/shop.service';
import { CategoryListSwiperComponent } from './components/category-list-swiper/category-list-swiper.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopRatingComponent } from './components/shop-rating/shop-rating.component';
import { ShopFoodComponent } from './components/shop-food/shop-food.component';
import { ShopBuyCarComponent } from './components/shop-buy-car/shop-buy-car.component';

const routes: Routes = [
    { path: 'home/:geohash', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'food', component: FoodComponent },
    { path: 'shop/:geohash/:id', component: ShopComponent },
    { path: 'confirmOrder', component: ConfirmOrderComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([HomeEffect, SearchEffect]),
        StoreModule.forFeature('order', reducer)
    ],
    declarations: [
        HomeComponent, SearchComponent, FoodComponent, ShopComponent,
        ConfirmOrderComponent, ShopListComponent, DistancePipe, CategoryListSwiperComponent,
        ShopRatingComponent, ShopFoodComponent, ShopBuyCarComponent],
    providers: [HomeService, PositionService, CityHistoryService, SearchService, ShopService]
})
export class OrdersModule { }
