import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  path: string;
  constructor(public $location: Location) {
    this.path = $location.path();
  }

  ngOnInit() {
  }

}
