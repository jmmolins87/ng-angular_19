import { Component, input } from '@angular/core';

import { Gif } from '../../../interfaces/gif.interface';


@Component({
  selector: 'gif-lsit-item',
  imports: [],
  templateUrl: './gif-lsit-item.component.html',
})
export class GifLsitItemComponent {

  gif = input<string>();
}

