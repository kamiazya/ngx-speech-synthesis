import { Component, OnInit } from '@angular/core';
import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
  Lang,
  Volume,
} from 'speech-synthesis';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: Lang,
      useValue: 'en-US',
    },
    {
      provide: Volume,
      useValue: 1,
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'ngx-speech-synthesis';

  constructor(
    private f: SpeechSynthesisUtteranceFactoryService,
    private svc: SpeechSynthesisService,
  ) { }

  texts = [
    '吾輩は猫である。名前はまだ無い。',
    'どこで生れたかとんと見当がつかぬ。',
    '何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
    '吾輩はここで始めて人間というものを見た。',
    'しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。',
  ];

  ngOnInit() {
  }

  speech() {

    for (const text of this.texts) {
      const v = this.f.text(text);
      console.log(text, v);
      this.svc.speak(this.f.text(text));
    }
  }

}
