import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { eleServerUrl } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { City, CityGroup } from '../models/home';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    getGuessCity(): Observable<City> {
        return this.http.get<City>(`${eleServerUrl}/cities?type=guess`);
    }

    getHotCities(): Observable<City[]> {
        return this.http.get<City[]>(`${eleServerUrl}/cities?type=hot`);
    }

    getCityGroup(): Observable<CityGroup> {
        return this.http.get<CityGroup>(`${eleServerUrl}/cities?type=group`);
    }
}
