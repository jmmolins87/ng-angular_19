


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ProductsResponse } from '../interfaces/product.interface';
import { OptionsService } from '../interfaces/optionsService.interface';

const baseUrl = environment.BASE_URL;


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  getProducts(options: OptionsService): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
    .pipe(tap(resp => console.log(resp)));
  }

}
