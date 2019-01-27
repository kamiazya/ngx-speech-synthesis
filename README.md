[![Codacy Badge](https://api.codacy.com/project/badge/Grade/082267c017e047a7b9ecb888d0779860)](https://app.codacy.com/app/kamiazya/ngx-speech-synthesis?utm_source=github.com&utm_medium=referral&utm_content=kamiazya/ngx-speech-synthesis&utm_campaign=Badge_Grade_Dashboard) [![Maintainability](https://api.codeclimate.com/v1/badges/9723b4dde56568506ec5/maintainability)](https://codeclimate.com/github/kamiazya/ngx-speech-synthesis/maintainability) [![CodeFactor](https://www.codefactor.io/repository/github/kamiazya/ngx-speech-synthesis/badge)](https://www.codefactor.io/repository/github/kamiazya/ngx-speech-synthesis) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-synthesis.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-synthesis?ref=badge_shield) [![BCH compliance](https://bettercodehub.com/edge/badge/kamiazya/ngx-speech-synthesis?branch=master)](https://bettercodehub.com/) [![npm version](https://badge.fury.io/js/%40kamiazya%2Fngx-speech-synthesis.svg)](https://badge.fury.io/js/%40kamiazya%2Fngx-speech-synthesis)

# SpeechSynthesis

Angular 7+ speech synthesis service (based on browser implementation such as Chrome).

[![NPM](https://nodei.co/npm/@kamiazya/ngx-speech-synthesis.png)](https://nodei.co/npm/@kamiazya/ngx-speech-synthesis/)

## Demo

See [storybook](https://kamiazya.github.io/ngx-speech-synthesis/?selectedKind=DEMO&selectedStory=English&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel).

## See

[Support Browsers](https://caniuse.com/#feat=speech-synthesis)

[Web Speech API -- MDN](https://developer.mozilla.org/docs/Web/API/Web_Speech_API)

## Installation

### yarn

```bash
$ yarn add @kamiazya/ngx-speech-synthesis
```

### npm

```bash
$ npm install --save @kamiazya/ngx-speech-synthesis
```

## Setup

### Module

```typescript
import { NgModule } from '@angular/core';

import {
  SpeechSynthesisModule,
} from '@kamiazya/ngx-speech-synthesis';

@NgModule({
  declarations: [
    AppComponent,
    AppDemoComponent
  ],
  imports: [
    BrowserModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## API

```typescript
import { Component, NgModule } from '@angular/core';

import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '@kamiazya/ngx-speech-synthesis';

@Component({
  template: `
    <div>
      <p *ngFor="let text of contents">{{text}}</p>
    </div>
    <div>
      <button (click)="speech()">
        speech
      </button>
      <button (click)="resume()">
        resume
      </button>
      <button (click)="pause()">
        pause
      </button>
      <button (click)="cancel()">
        cancel
      </button>
    </div>
  `,
  providers: [
    SpeechSynthesisUtteranceFactoryService,
  ],
})
export class AppDemoComponent {

  contents = [
    'Peter Piper picked a peck of pickled peppers.',
    'A peck of pickled peppers Peter Piper picked.',
    'If Peter Piper picked a peck of pickled peppers,',
    'Where\'s the peck of pickled peppers Peter Piper picked?',
  ];

  constructor(
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,
  ) { }

  speech() {
    for (const text of this.contents) {
      const v = this.f.text(text);
      this.svc.speak(this.f.text(text));
    }
  }

  cancel() {
    this.svc.cancel();
  }
  pause() {
    this.svc.pause();
  }

  resume() {
    this.svc.resume();
  }
}

```

## Development

### On Demo App

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### On Storybook

Run `yarn storybook` for a dev server. Navigate to `http://localhost:9001/`. The app will automatically reload if you change any of the source files.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-synthesis.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-synthesis?ref=badge_large)
