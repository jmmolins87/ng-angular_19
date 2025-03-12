

import {
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';

import { LocaleService } from '../../services/locale.service';

import { AvailableLocale } from '../../interfaces/availableLocale.interface';


@Component({
  selector: 'app-basic-page',
  imports: [
    DatePipe,
    LowerCasePipe,
    TitleCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

  localService = inject(LocaleService);

  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal<string>('juanma');
  nameUpper = signal<string>('JUANMA');
  fullName = signal<string>('juAnMa moLiNS');
  customDate = signal<Date>(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1000);
    onCleanup(() => clearInterval(interval));
  })

  changeLocale(locale: AvailableLocale) {
    this.localService.changeLocale(locale);
  }
}
