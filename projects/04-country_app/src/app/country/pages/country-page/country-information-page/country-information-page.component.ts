import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Country } from '../../../interfaces/country.interface';


@Component({
  selector: 'app-country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information-page.component.html',
})
export class CountryInformationPageComponent {

  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  })
}
