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

const routes: Routes = [
  { path: ':geohash', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'food', component: FoodComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'confirmOrder', component: ConfirmOrderComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent, SearchComponent, FoodComponent, ShopComponent, ConfirmOrderComponent, ShopListComponent, DistancePipe]
})
export class OrdersModule { }
