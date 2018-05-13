import { Injectable } from '@angular/core';
import Dexie from 'dexie';
// import Dexie from 'dexie';

@Injectable({
    providedIn: 'root'
})
export class CityHistoryService extends Dexie {

    constructor() {
        super('ele');
        this.version(1).stores({
            cityHistory: '++id',
        });
    }
}