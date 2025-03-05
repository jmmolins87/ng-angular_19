import {
  Component,
  inject,
  signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { GifsService } from '../../../services/gifs.service';

import { MenuOptions } from '../../../interfaces/menu-options.interface';


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  menuOptions = signal<MenuOptions[]>([
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscar',
      subLabel: 'Busca tus gifs',
      route: '/dashboard/search'
    }
  ])

  gifsService = inject(GifsService);
}
