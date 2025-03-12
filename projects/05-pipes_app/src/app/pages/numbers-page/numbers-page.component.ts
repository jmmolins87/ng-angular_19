


import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe
} from '@angular/common';
import {
  Component,
  effect,
  signal
} from '@angular/core';


@Component({
  selector: 'app-numbers-page',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
  ],
  templateUrl: './numbers-page.component.html',
})
export default class NumbersPageComponent {

  totalSells = signal<number>(2_433_232.5567);
  percent = signal<number>(0.4856);
}
