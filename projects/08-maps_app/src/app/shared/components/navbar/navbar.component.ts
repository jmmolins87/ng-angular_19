

import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink
} from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { filter, map, tap } from 'rxjs';

import { routes } from '../../../app.routes';


@Component({
  selector: 'shared-navbar',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  router = inject(Router)

  routes = routes.map(route => ({
    path: route.path,
    title: `${ route.title ?? 'Mapas en Angular' }`
  })).filter(route => route.path !== '**')

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event.url),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas en Angular')
  )
}
