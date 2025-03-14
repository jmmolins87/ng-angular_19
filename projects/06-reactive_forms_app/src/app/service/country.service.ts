



import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { combineLatest, Observable, of } from 'rxjs';

import { Country } from '../interface/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _http = inject(HttpClient);
  private _baseURL = 'https://restcountries.com/v3.1';
  private _regions = [
    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
  ]

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {

    if(!region) return of([]);

    const url = `${this._baseURL}/region/${region}?fields=cca3,name,borders`;
    return this._http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this._baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this._http.get<Country>(url);
  }

  getCountryNameByCodeArray(countryCodes: string[]): Observable<Country[]> {

    if(!countryCodes || countryCodes.length === 0) return of([]);
    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })

    return combineLatest(countriesRequests);
  }
}
