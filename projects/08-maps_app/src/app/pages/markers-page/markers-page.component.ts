


import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild
} from '@angular/core';

import mapboxgl, { LngLatLike } from 'mapbox-gl';

import { v4 as UUIDv4 } from 'uuid';

import { environment } from '../../../environments/environment';

import { Marker } from '../../interfaces/marker.interface';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-4.115727, 40.940568], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if(!this.map()) return;

    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const coords = event.lngLat;
    const marker = new mapboxgl.Marker({
      draggable: false,
      color
    })
    .setLngLat(coords)
    .addTo(map);
    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: marker
    };

    this.markers.set([newMarker, ...this.markers()]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map()) return;
    this.map()?.flyTo({
      center: lngLat
    });
  }

  deleteMarker(marker: Marker) {

    if(!this.map()) return;

    const map = this.map()!;
    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
