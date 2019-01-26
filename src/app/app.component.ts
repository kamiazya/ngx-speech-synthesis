import { Component, OnInit } from '@angular/core';
import { Pitch, Rate, Voice } from 'speech-synthesis';
import { Manuscript, manuscripts } from './manuscripts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: Pitch,
      useValue: 1.5,
    },
    {
      provide: Rate,
      useValue: 2,
    },
    {
      provide: Voice,
      useValue: 'Kyoko',
    },
  ],
})
export class AppComponent implements OnInit {

  public manuscripts: Manuscript[] = manuscripts;

  selectingIndex = 0;

  lang: string;
  content: string;

  selectingManuscript: Manuscript;

  constructor() {
    this.selectByIndex(0);
  }
  ngOnInit() {
  }

  selectByIndex(index: number) {
    this.selectingIndex = index;
    this.selectingManuscript = this.manuscripts[this.selectingIndex];
    this.lang = this.selectingManuscript.lang;
    this.content = this.selectingManuscript.content;
  }

}
