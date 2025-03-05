


import { Component, inject } from '@angular/core';

import { DragonBallService } from '../../services/db.service';

import { AddCharacterComponent } from "../../components/dragon-ball/add-character/add-character.component";
import { ListCharacterComponent } from "../../components/dragon-ball/list-character/list-character.component";


@Component({
  selector: 'app-dragon-ball-page',
  imports: [AddCharacterComponent, ListCharacterComponent],
  templateUrl: 'dragon-ball-super-page.component.html'
})

export class DragonBallSuperPageComponent {

  dbService = inject(DragonBallService);
}
