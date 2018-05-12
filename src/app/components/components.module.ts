import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SvgIconComponent,
        HeaderComponent,
        FooterComponent,
    ],
    exports: [SvgIconComponent, HeaderComponent, FooterComponent]
})
export class ComponentsModule { }
