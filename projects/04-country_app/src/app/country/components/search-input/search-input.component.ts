import { Component, input, output, signal } from '@angular/core';


@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent { 

  placeholder = input<string>('Buscar');

  search = output<string>();

  inputField = signal<string>('');
  
  onSearch(value: string) {
    this.search.emit(value);
    this.inputField.set('');
  }
}
