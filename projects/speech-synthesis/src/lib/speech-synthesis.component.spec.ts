import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechSynthesisComponent } from './speech-synthesis.component';

describe('SpeechSynthesisComponent', () => {
  let component: SpeechSynthesisComponent;
  let fixture: ComponentFixture<SpeechSynthesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechSynthesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
