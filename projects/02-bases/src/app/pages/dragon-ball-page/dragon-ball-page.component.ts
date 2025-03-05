


import { Component, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragon-ball-page',
  templateUrl: 'dragon-ball-page.component.html'
})

export class DragonBallPageComponent {

  name = signal<string>('');
  power = signal<number>(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 10000 },
    { id: 2, name: 'Vegeta', power: 9500 },
    { id: 3, name: 'Trunks', power: 3000 },
    { id: 3, name: 'Yamcha', power: 500 }
  ]);

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter:Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }
    this.characters.update((currentCharacters) => [...currentCharacters, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
