import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpeechSynthesisModule } from 'speech-synthesis';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatSliderModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { SpeechSynthesisDemoComponent } from './components/speech-synthesis-demo/speech-synthesis-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    SpeechSynthesisDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    SpeechSynthesisModule.forRoot({
      lang: 'ja',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
