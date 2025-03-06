


import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal
} from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { environment } from './../../../environments/environment';

import { GifMapper } from '../mapper/gif.mapper';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';


const loadLocalStorage = ():Record<string, Gif[]> => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : {};
}


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);
  private trendingPage = signal<number>(0);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  searchHistory = signal<Record<string, Gif[]>>(loadLocalStorage());

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  })
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http.get<GiphyResponse>(`${environment.GIPHY_URL}/gifs/trending`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: '50',
        offset: this.trendingPage() * 50,
      }
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ]);
      this.trendingPage.update(currentPage => currentPage + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query:string):Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.GIPHY_URL}/gifs/search`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: '50',
        q: query
      }
    })
    .pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query:string):Gif[] {
    return this.searchHistory()[query.toLowerCase()] ?? [];
  }

}
