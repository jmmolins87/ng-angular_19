import { Component, input } from '@angular/core';

import { GifLsitItemComponent } from './gif-lsit-item/gif-lsit-item.component';

import { Gif } from '../../interfaces/gif.interface';


@Component({
  selector: 'gif-list',
  imports: [GifLsitItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {

  gifsUrls = input.required<Gif[]>();
}
