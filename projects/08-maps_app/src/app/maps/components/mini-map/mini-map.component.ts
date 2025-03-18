

import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild
} from '@angular/core';

import mapboxgl from 'mapbox-gl';

import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'map-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  coords = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coords(),
      zoom: this.zoom(), // starting zoom
      pitch: 45
    });

    new mapboxgl.Marker()
      .setLngLat(this.coords())
      .addTo(map);
  }
}
