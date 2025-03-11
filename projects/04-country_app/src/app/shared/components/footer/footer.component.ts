import { Component, signal } from '@angular/core';

@Component({
  selector: 'shared-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  date = signal(new Date().getFullYear());
}
