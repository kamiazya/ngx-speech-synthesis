import { Component, OnInit } from '@angular/core';
import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from 'speech-synthesis';

import { manuscripts, Manuscript } from './manuscripts';
import { Observable, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-speech-synthesis-demo',
  templateUrl: './speech-synthesis-demo.component.html',
  styleUrls: ['./speech-synthesis-demo.component.scss']
})
export class SpeechSynthesisDemoComponent implements OnInit {

  public manuscripts: Manuscript[] = manuscripts;

  constructor(
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,
  ) { }

  selectingIndex = 0;

  selectingManuscript: Manuscript;

  ngOnInit() {
    this.selectByIndex(0);
  }

  selectByIndex(index: number) {
    this.selectingIndex = index;
    this.selectingManuscript = this.manuscripts[this.selectingIndex];
    this.f.lang = this.selectingManuscript.lang;
  }

  speech() {
    for (const text of this.selectingManuscript.contents) {
      const v = this.f.text(text);
      console.log(text, v);
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
