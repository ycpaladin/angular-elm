import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Category } from '../../models';
import Swiper from 'swiper';

@Component({
  selector: 'app-category-list-swiper',
  templateUrl: './category-list-swiper.component.html',
  styleUrls: ['./category-list-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListSwiperComponent implements OnInit, AfterViewInit {


  @ViewChild('swiperContainer') swiperContainer: ElementRef;
  @ViewChild('swiperPagination') swiperPagination: ElementRef;

  @Input() foodTypes: Category[][];
  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const x = new Swiper(this.swiperContainer.nativeElement, {
      pagination: {
        el: this.swiperPagination.nativeElement,
        // dynamicBullets: true,
      },
      loop: true
    });
  }

}
