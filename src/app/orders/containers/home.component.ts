import { Component, OnInit } from '@angular/core';


// import { imgBaseUrl } from '../../../environments/environment';
import { Category } from '../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imgBaseUrl: string;
  geohash: string;
  msiteTitle: string;
  hasGetData: string;
  foodTypes: Observable<Category[]>;
  constructor(public route$: ActivatedRoute) {
    this.imgBaseUrl = 'https://fuss10.elemecdn.com';
    this.msiteTitle = '请选择地址...';
  }

  ngOnInit() {
  }

}
