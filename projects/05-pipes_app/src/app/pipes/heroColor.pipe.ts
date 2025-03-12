import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroColor',
})
export class HeroColorPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'red';
      break;
      case 1:
        return 'black';
      break;
      case 2:
        return 'blue'
      break;
      case 3:
        return 'green'
      break;
      default:
        return 'No color';
      break;
    }
  }
}
