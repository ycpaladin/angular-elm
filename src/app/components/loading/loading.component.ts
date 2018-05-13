import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {


    positionY: number;
    timer: any;
    constructor() { }

    ngOnInit() {
        setTimeout(function timer() {
            this.positionY++;
            this.timer = setTimeout(timer.bind(this), 600);
            timer();
        }.bind(this), 600);
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }

}
