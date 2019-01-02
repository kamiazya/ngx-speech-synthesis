import { TestBed } from '@angular/core/testing';

import { SpeechSynthesisService } from './speech-synthesis.service';

describe('SpeechSynthesisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechSynthesisService = TestBed.get(SpeechSynthesisService);
    expect(service).toBeTruthy();
  });
});
