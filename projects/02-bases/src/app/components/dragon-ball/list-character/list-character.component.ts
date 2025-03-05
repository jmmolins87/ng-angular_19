import { Component, input } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'db-list-character',
  imports: [],
  templateUrl: './list-character.component.html'
})
export class ListCharacterComponent {

  listName = input.required<string>();
  characters = input<Character[]>();
}
