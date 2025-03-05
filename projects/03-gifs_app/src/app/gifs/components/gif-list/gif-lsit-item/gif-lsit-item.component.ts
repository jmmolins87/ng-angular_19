import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-lsit-item',
  imports: [],
  templateUrl: './gif-lsit-item.component.html',
})
export class GifLsitItemComponent {

  gif = input<string>('');
}

