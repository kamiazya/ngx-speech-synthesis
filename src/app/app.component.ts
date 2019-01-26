import { Component, OnInit } from '@angular/core';
import { Pitch, Rate, Voice } from 'speech-synthesis';

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
  ngOnInit() {
  }


}
