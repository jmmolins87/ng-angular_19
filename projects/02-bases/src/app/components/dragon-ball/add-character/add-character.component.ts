


import { 
  Component, 
  input, 
  output,
  signal 
} from '@angular/core';

import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'db-add-character',
  imports: [],
  templateUrl: './add-character.component.html'
})
export class AddCharacterComponent {

  listName = input.required<string>();

  newCharacter = output<Character>();

  name = signal<string>('');
  power = signal<number>(0);

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter:Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power()
    }
    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
