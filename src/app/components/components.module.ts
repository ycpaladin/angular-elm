import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SvgIconComponent,
        HeaderComponent,
        FooterComponent,
        LoadingComponent,
    ],
    exports: [SvgIconComponent, HeaderComponent, FooterComponent, LoadingComponent]
})
export class ComponentsModule { }
