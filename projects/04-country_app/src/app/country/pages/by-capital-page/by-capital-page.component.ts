import {
  Component,
  inject,
  signal
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { of } from 'rxjs';

import { CountryService } from '../../services/country.service';

import { ListComponent } from "../../components/list/list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";


@Component({
  selector: 'app-by-capital-page',
  imports: [ListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      return this.countryService.byCapital(request.query)
    }
  })

  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request}) => {
  //     if(!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.byCapital(request.query)
  //     )
  //   }
  // })

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // searchByCapital(query:string) {

  //   if(this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.byCapital(query).subscribe({
  //     next:(countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error:(err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   })
  // }
}
