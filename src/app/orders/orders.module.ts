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
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './effects/home.effect';
import { HomeService } from './services/home.service';
import { PositionService } from './services/position.service';
import { CityHistoryService } from '../services/city-history.service';
import { PositionEffect } from './effects/position.effect';
import { CategoryListSwiperComponent } from './components/category-list-swiper/category-list-swiper.component';

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
    EffectsModule.forFeature([HomeEffect, PositionEffect]),
    StoreModule.forFeature('order', reducer)
  ],
  declarations: [
    HomeComponent, SearchComponent, FoodComponent, ShopComponent,
    ConfirmOrderComponent, ShopListComponent, DistancePipe, CategoryListSwiperComponent],
  providers: [HomeService, PositionService, CityHistoryService]
})
export class OrdersModule { }
