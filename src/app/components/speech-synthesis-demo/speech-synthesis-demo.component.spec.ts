import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechSynthesisDemoComponent } from './speech-synthesis-demo.component';

describe('SpeechSynthesisDemoComponent', () => {
  let component: SpeechSynthesisDemoComponent;
  let fixture: ComponentFixture<SpeechSynthesisDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechSynthesisDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechSynthesisDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
