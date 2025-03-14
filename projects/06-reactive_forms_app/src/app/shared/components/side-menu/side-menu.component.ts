


import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { MenuItems } from '../../../interface/menu-items.interface';


const reactiveItems = reactiveRoutes[0].children ?? [];


@Component({
  selector: 'shared-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent { 

  reactiveMenu: MenuItems[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map(item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    }
  ));

  authMenu: MenuItems[] = [{
    title: 'Registro',
    route: './auth'
  }]

  countryMenu: MenuItems[] = [{
    title: 'Países',
    route: './country'
  }]
}
