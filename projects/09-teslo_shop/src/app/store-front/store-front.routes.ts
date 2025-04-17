


import { Routes } from '@angular/router';

import { StoreFrontLayoutComponent } from './layout/store-front-layout/store-front-layout.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundComponent } from 'projects/04-country_app/src/app/shared/components/not-found/not-found.component';


export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'gender/:gender',
        component: GenderPageComponent
      },
      {
        path: 'product/:idSlug',
        component: ProductPageComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]


export default storeFrontRoutes;
