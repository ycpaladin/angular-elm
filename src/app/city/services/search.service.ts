import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityHistory, CityHistoryWithId } from '../models/city';
import { Dexie } from 'dexie';
import { eleServerUrl } from '../../../environments/environment';
import { IndexDbBaseService } from '../../services/indexDb.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {


    constructor(private $http: HttpClient) {

    }

    searchPosition(city_id: string, keyword: string, type: string = 'search'): Observable<CityHistory[]> {
        return this.$http.get<CityHistory[]>(`${eleServerUrl}/v1/pois`, {
            params: {
                type,
                keyword,
                city_id,
            }
        });
    }


}
