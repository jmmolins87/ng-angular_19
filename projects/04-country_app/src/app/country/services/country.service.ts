
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  catchError,
  delay,
  map,
  Observable,
  of,
  tap,
  throwError
} from 'rxjs';

import { environment } from '../../../environments/environment';

import { CountryMapper } from '../mappers/country.mapper';

import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  byCapital(query:string):Observable<Country[]> {

    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        delay(2000),
        catchError((err) => {
          console.log('Error fetching ', err);
          return throwError(
            () => new Error(`No se encontró un país con esta capital: <strong>${query}</strong>`)
          );
        })
      );
  }

  byCountry(query: string): Observable<Country[]> {

    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/name/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        catchError((err) => {
          console.log('Error fetching ', err);
          return throwError(
            () => new Error(`No se encontró un país con este nombre: <strong>${query}</strong>`)
          );
        })
      );
  }

  byCountryAplphaCode(code: string) {
    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/alpha/${code}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
        delay(2000),
        map(countries => countries.at(0)),
        catchError((err) => {
          console.log('Error fetching ', err);
          return throwError(
            () => new Error(`No se encontró un país con este código: <strong>${code}</strong>`)
          );
        })
      );
  }

  byRegion(region: Region) {

    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheCountry.get(region) ?? []);
    }

    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/region/${region}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError((err) => {
          console.log('Error fetching ', err);
          return throwError(
            () => new Error(`No se encontró un país con este código: <strong>${region}</strong>`)
          );
        })
      );
  }
}
