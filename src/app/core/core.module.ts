import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionService } from './services/position.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [PositionService]
})
export class CoreModule { }
