
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  catchError,
  delay,
  map,
  Observable,
  throwError
} from 'rxjs';

import { environment } from '../../../environments/environment';

import { CountryMapper } from '../mappers/country.mapper';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  byCapital(query:string):Observable<Country[]> {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
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
    return this.http
      .get<RESTCountry[]>(`${environment.COUNTRY_APP_URL}/name/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountriesArrayToCountryArray(restCountries)),
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
}
