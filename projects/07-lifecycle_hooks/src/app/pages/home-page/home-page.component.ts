

import {
  AfterContentChecked,
  AfterContentInit,
  afterNextRender,
  afterRender,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  effect,
  OnChanges,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';

import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(`${ messages[0] } %c${ messages.slice(1).join(', ')}`, 'color: #baba55');
}


@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  traditionalProperty = 'Juanma';
  signalProperty = signal('Juanma');

  constructor() {
    log('constructor:	Llamado.');

    // setTimeout(() => {
    //   this.traditionalProperty = 'Pedro';
    //   this.signalProperty.set('Juan Carlos');
    //   console.log('Hecho');
    // }, 2000);
  }

  changeTraditionalProperty() {
    this.traditionalProperty = 'Juanma Molins';
  }

  changesignal() {
    this.signalProperty.set('Juanma Molins');
  }

  basicEffect = effect((onCleanup) => {
    log(
      'effect:',
      "Disparar efectos secundarios."
    )

    onCleanup(() => {
      log(
        'onCleanup:',
        "Se ejecuta cuando el efecto se va a destruir."
      )
    })
  })

  ngOnInit() {
    log(
      'ngOnInit:',
      "Runs once after Angular has initialized all the component's inputs."
    )
  }

  ngOnChanges() {
    log(
      'ngOnChanges:',
      "Runs every time the component's inputs have changed."
    )
  }

  ngDoCheck() {
    log(
      'ngDoCheck:',
      "Runs every time this component is checked for changes."
    )
  }

  ngAfterContentInit() {
    log(
      'ngAfterContentInit:',
      "Runs once after the component's content has been initialized."
    )
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked:',
      "Runs every time this component content has been checked for changes."
    )
  }

  ngAfterViewInit() {
    log(
      'ngAfterViewInit:',
      "Runs once after the component's view has been initialized."
    )
  }

  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked:',
      "Runs every time the component's view has been checked for changes."
    )
  }

  ngOnDestroy() {
    log(
      'ngOnDestroy:',
      "Runs once before the component is destroyed."
    )
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender:',
      "Runs once the next time that all components have been rendered to the DOM."
    )
  })

  afterRender = afterRender(() => {
    log(
      'afterRender:',
      "Runs once the next time that all components have been rendered to the DOM."
    )
  })
}
