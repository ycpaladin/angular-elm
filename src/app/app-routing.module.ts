import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'city', loadChildren: () => import('./city/city.module').then(m => m.CityModule) },
  { path: 'msite', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'my', loadChildren: () => import('./mine/mine.module').then(m => m.MineModule) },
  { path: '', pathMatch: 'full', redirectTo: 'city' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
