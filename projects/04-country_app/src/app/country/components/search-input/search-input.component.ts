import {
  Component,
  effect,
  input,
  linkedSignal,
  output
} from '@angular/core';


@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input<string>('Buscar');
  debounceTime = input<number>(1000);
  initialValue = input<string>();

  search = output<string>();

  inputField = linkedSignal<string>(() => this.initialValue() ?? '');

  onSearch(value: string) {
    this.search.emit(value);
    this.inputField.set('');
  }

  debounceEffect = effect((onCleanup) => {

    const value = this.inputField();
    const timeout = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
