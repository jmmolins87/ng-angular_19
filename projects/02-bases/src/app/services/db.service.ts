


import { effect, Injectable, signal } from '@angular/core';

import { Character } from '../interfaces/character.interface';

const loadLocalStorage = ():Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}

@Injectable({
    providedIn: 'root'
})
export class DragonBallService {

  characters = signal<Character[]>(loadLocalStorage());

  saveLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  })

  addCharacter(newCharacter:Character) {
    this.characters.update((currentCharacters) => [...currentCharacters, newCharacter]);
  }
}
