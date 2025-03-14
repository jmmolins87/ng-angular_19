

import { Routes } from '@angular/router';

import { RegisterPageComponent } from './pages/register-page/register-page.component';


export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        title: 'Auth',
        component: RegisterPageComponent
      },
      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
]


export default authRoutes;
