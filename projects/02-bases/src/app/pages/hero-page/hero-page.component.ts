

import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: 'hero-page.component.html'
})

export class HeroPageComponent {

  name = signal<string>('Ironman');
  age = signal<number>(45);

  heroDescription = computed(() => {
    return `${this.name()} - ${this.age()}`;
  })

  capitalizeName = computed(() => {
    return this.name().toUpperCase();
  })

  getHeroDescription() {
    return `${this.name()} - ${this.age()}`;
  }

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  chageAge() {
    this.age.set(60);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
