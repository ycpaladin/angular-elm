import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login.component';
import { RegisterComponent } from './containers/register.component';
import { OrderComponent } from './containers/order.component';
import { OrderListComponent } from './containers/order-list.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BenefitComponent } from './containers/benefit.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule,
    ],
    declarations: [LoginComponent, RegisterComponent, OrderComponent, OrderListComponent, BenefitComponent]
})
export class AuthModule { }
