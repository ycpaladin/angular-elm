import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';
// import { reducers, CustomSerializer } from './store/router.reducer';
import { StoreRouterConnectingModule, RouterStateSerializer, DefaultRouterStateSerializer } from '@ngrx/router-store';
// import { CustomSerializer } from './shared/unils';
import { CoreModule } from './core/core.module';
import { PositionEffect } from './core/effects/position.effect';

// const routes: Routes = [
//     { path: '', pathMatch: 'full', redirectTo: 'city' },
//     { path: 'city', loadChildren: './city/city.module#CityModule' },
//     { path: 'msite', loadChildren: './orders/orders.module#OrdersModule' },
//     { path: 'my', loadChildren: './mine/mine.module#MineModule' },
// ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PositionEffect]),
    ComponentsModule,
    CoreModule,
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,
        stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
        maxAge: 20,
        name: 'elm store'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
