import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './containers/city.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './containers/search.component';
import { HomeService } from './services/home.service';
import { SearchService } from './services/search.service';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './effects/search.effects';
import { HomeEffects } from './effects/home.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { CityHistoryService } from '../services/city-history.service';

const routes: Routes = [
    { path: '', component: CityComponent, },
    { path: 'search/:id', component: SearchComponent }
];
@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([SearchEffects, HomeEffects]),
        StoreModule.forFeature('city', reducer)
    ],
    declarations: [SearchComponent, CityComponent],
    providers: [HomeService, SearchService, CityHistoryService]
})
export class CityModule { }
