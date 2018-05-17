import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';
// import { reducers, CustomSerializer } from './store/router.reducer';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './shared/unils';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'city' },
    { path: 'city', loadChildren: './city/city.module#CityModule' },
    { path: 'msite', loadChildren: './orders/orders.module#OrdersModule' },
    { path: 'my', loadChildren: './mine/mine.module#MineModule' },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        BrowserModule,
        ComponentsModule,
        RouterModule.forRoot(routes, { useHash: true }), // , enableTracing: true
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
        StoreDevtoolsModule.instrument({
            name: 'elm store'
        })
    ],
    providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
    bootstrap: [AppComponent]
})
export class AppModule { }
