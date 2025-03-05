import {
  Component,
  inject,
  signal
} from '@angular/core';

import { GifsService } from '../../services/gifs.service';

import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from '../../interfaces/gif.interface';


@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {

  gifsService = inject(GifsService);
}
