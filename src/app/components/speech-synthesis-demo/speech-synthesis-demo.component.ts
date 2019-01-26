import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '../../../../projects/speech-synthesis/src/public_api';

import { Observable, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-speech-synthesis-demo',
  templateUrl: './speech-synthesis-demo.component.html',
  styleUrls: ['./speech-synthesis-demo.component.scss'],
  providers: [
    SpeechSynthesisUtteranceFactoryService,
  ],
})
export class SpeechSynthesisDemoComponent implements OnInit, OnChanges {

  constructor(
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,
  ) { }

  @Input()
  content = '';


  @Input()
  lang = '';

  @Input()
  setting = false;

  @Output()
  utterance = new EventEmitter<SpeechSynthesisUtterance>();

  ngOnChanges(_: SimpleChanges) {
    this.f.lang = this.lang;
  }

  get contentTexts(): string[] {
    return this.content.split('\n');
  }

  ngOnInit() {
  }

  speech() {
    for (const text of this.contentTexts) {
      const v = this.f.text(text);
      // console.log(text, v);
      this.utterance.emit(v);
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

  getVoices$(): Observable<SpeechSynthesisVoice[]> {
    const sub = new ReplaySubject<SpeechSynthesisVoice[]>(1);
    sub.next(this.svc.getVoices());
    this.svc.onvoiceschanged = () => sub.next(this.svc.getVoices());
    return sub.asObservable();
  }

}
