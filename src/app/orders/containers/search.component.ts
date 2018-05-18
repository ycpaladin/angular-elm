import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromOrder from '../reducers';
import { SearchHistory, SearchItem } from '../models';
import { Observable } from 'rxjs';
import { Search, ClearSearchHistory, LoadSearchHistory, DeleteSearchHistory } from '../actions/search.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue: string;
  searchHistory: Observable<SearchHistory[]>;
  searchResult: Observable<SearchItem[]>;
  geohash: Observable<string>;
  constructor(private store$: Store<fromOrder.State>) {
    this.searchHistory = this.store$.pipe(select(fromOrder.getSearchHistory));
    this.searchResult = this.store$.pipe(select(fromOrder.getSearchResult));
    this.geohash = this.store$.pipe(select(fromOrder.getGeohash));
  }

  ngOnInit() {
    this.store$.dispatch(new LoadSearchHistory());
  }

  searchTarget(keyword: string) {
    if (keyword) {
      this.store$.dispatch(new Search(keyword));
    }
  }

  clearAllHistory() {
    this.store$.dispatch(new ClearSearchHistory());
  }

  deleteHistory(id: number) {
    this.store$.dispatch(new DeleteSearchHistory(id));
  }

}
