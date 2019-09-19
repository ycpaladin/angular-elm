import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'city' },
  { path: 'city', loadChildren: './city/city.module#CityModule' },
  { path: 'msite', loadChildren: './orders/orders.module#OrdersModule' },
  { path: 'my', loadChildren: './mine/mine.module#MineModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
