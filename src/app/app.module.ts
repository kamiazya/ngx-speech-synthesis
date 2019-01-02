import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpeechSynthesisModule } from 'speech-synthesis';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SpeechSynthesisModule.forRoot({
      lang: 'ja',
      volume: 1.0,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
