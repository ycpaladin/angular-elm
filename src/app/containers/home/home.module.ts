import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { HomeComponent } from './home.component';
import { HomeService } from './services/home.service';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    providers: [HomeService]
})
export class HomeModule { }
