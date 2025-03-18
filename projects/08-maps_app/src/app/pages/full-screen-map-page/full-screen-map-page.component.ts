


import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild
} from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';

import mapboxgl from 'mapbox-gl';

import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'app-full-screen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './full-screen-map-page.component.html',
  styleUrl: './full-screen-map-page.component.css'
})
export class FullScreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  zoomEffect = effect(() => {
    if(!this.map()) return;
    this.map()?.setZoom(this.zoom());
  })

  zoom = signal<number>(14);
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lng: -74.5,
    lat: 40
  });

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;
    const {lat, lng} = this.coordinates();
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center)
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
