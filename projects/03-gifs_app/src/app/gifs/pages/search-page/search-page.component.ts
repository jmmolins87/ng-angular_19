import {
  Component,
  ElementRef,
  inject,
  signal
} from '@angular/core';

import { GifsService } from '../../services/gifs.service';

import { GifListComponent } from "../../components/gif-list/gif-list.component";

import { Gif } from '../../interfaces/gif.interface';


@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);

  gifs = signal<Gif[]>([]);
  searchInput = signal<string>('');

  searchGif(query:string) {
    if(this.searchInput().length === 0) return;
    this.gifsService.searchGifs(query)
    .subscribe((resp) => {
      this.gifs.set(resp);
    });
    this.searchInput.set('');
  }
}
