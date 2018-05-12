import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    @Input() headTitle: string;
    @Input() goBack: boolean;
    @Input() signinUp: boolean;
    constructor(public $location: Location) { }

    ngOnInit() {
    }


}
