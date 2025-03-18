

import { Component, signal } from '@angular/core';

import { v4 as UUIDv4 } from 'uuid';

import { MiniMapComponent } from '../../maps/components/mini-map/mini-map.component';

import { HouseProperty } from '../../interfaces/house-property.interface';


@Component({
  selector: 'app-houses-page',
  imports: [MiniMapComponent],
  templateUrl: './houses-page.component.html',
})
export class HousesPageComponent {

  houses = signal<HouseProperty[]>([
    {
      id: UUIDv4(),
      name: 'Villa Serenidad',
      description:
        'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lng: -4.115919, lat: 40.940468 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: UUIDv4(),
      name: 'Casa del Sol',
      description:
        'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: { lng: -73.998393, lat: 40.711056 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: UUIDv4(),
      name: 'Residencia Esmeralda',
      description:
        'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lng: 118.265127, lat: 33.982271 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: UUIDv4(),
      name: 'Hacienda del Lago',
      description:
        'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lng: -0.864, lat: 41.659 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);
}
