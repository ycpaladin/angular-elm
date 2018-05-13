import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityHistory } from '../models/city';
import { Store, select } from '@ngrx/store';
import * as fromCity from '../reducers';

@Component({
    selector: 'app-city-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    inputVaule: string;
    historytitle: Observable<string>;
    placelist: Observable<CityHistory[]>;
    placeNone: boolean;
    constructor(private $cityStore: Store<fromCity.State>) {
        // this.historytitle = this.$homeStore.pipe(select(fromHost.getGuessCityName));
        this.placelist = this.$cityStore.pipe(select(fromCity.getHistory));
    }

    ngOnInit() {
    }

    clearAll() {

    }

    postpois() {
        alert(this.inputVaule);
    }
}
