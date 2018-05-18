import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {


    positionY = 0;
    timer: any;
    constructor() { }

    ngOnInit() {
        (function timer() {
            this.positionY++;
            this.timer = setTimeout(timer.bind(this), 600);
        }).apply(this);
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }

}
