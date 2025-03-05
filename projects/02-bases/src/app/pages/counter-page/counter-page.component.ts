import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html'
})

export class CounterPageComponent {

  counter = 0;
  counterSignal = signal<number>(0);

  increaseBy(value:number) {
    // this.counter += value;
    this.counterSignal.update((currentValue:number) => currentValue + value);
  }

  reset() {
    // this.counter = 0;
    this.counterSignal.set(0);
  }
}
