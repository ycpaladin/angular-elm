import { Component, OnInit } from '@angular/core';
import * as fromHome from '../reducers';
import * as actions from '../actions/home.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { City, CityGroup } from '../models/home';

@Component({
    selector: 'app-city-home',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

    guessCity: Observable<string>;
    guessCityid: Observable<string>;
    hotCities: Observable<City[]>;
    cityGroup: Observable<{ key: string, cities: City[] }[]>;
    isFetching: Observable<boolean>;
    constructor(private $store: Store<fromHome.State>) {
        this.guessCityid = this.$store.pipe(select(fromHome.getGuessCityId));
        this.guessCity = this.$store.pipe(select(fromHome.getGuessCityName));
        this.hotCities = this.$store.pipe(select(fromHome.getHotCities));
        this.cityGroup = this.$store.pipe(select(fromHome.getCityGroup));

        // this.isFetching = this.$store.pipe(select(fromHome.getIsFetching));
        // console.log(this.isFetching);
    }

    ngOnInit() {
        this.$store.dispatch(new actions.LoadCityData());
    }

}
