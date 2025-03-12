


import { Component, signal } from '@angular/core';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

import { CardComponent } from "../../components/card/card.component";
import { interval, map, tap, timeout } from 'rxjs';

const client1 = {
  name: 'Juanma',
  gender: 'male',
  age: 37,
  adress: 'Segovia, España'
}
const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 31,
  adress: 'Dublín, Irlanda'
}


@Component({
  selector: 'app-uncommon-page',
  imports: [
    AsyncPipe,
    CardComponent,
    I18nPluralPipe,
    I18nSelectPipe,
    JsonPipe,
    KeyValuePipe,
    SlicePipe,
    TitleCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  // i18nSelect Pipe
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  // i18nPlural Pipe
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    other: 'tenemos # clientes esperando.'
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Juan',
    'Carlos',
  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1));
  }

  // keyvalue Pipe
  profile = {
    name: 'Juanma',
    age: 37,
    adress: 'Segovia, España'
  }

  // async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos datos de la promesa');
      reject('No se pudieron obtener los datos');
      console.log('Promesa resuelta');
    }, 3500)
  })

  // async Pipe como Observable
  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap:', value))
  )

}
