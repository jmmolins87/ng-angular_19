


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

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>(loadLocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.GIPHY_URL}/gifs/trending`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: '50'
      }
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
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

    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log({gifs});
    // });
  }

  getHistoryGifs(query:string):Gif[] {
    return this.searchHistory()[query.toLowerCase()] ?? [];
  }

}
