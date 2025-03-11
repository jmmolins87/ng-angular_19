import {
  Component,
  inject,
  resource,
  signal
} from '@angular/core';

import { of } from 'rxjs';

import { CountryService } from '../../services/country.service';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);

  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      return this.countryService.byCountry(request.query)
    }
  })
}
