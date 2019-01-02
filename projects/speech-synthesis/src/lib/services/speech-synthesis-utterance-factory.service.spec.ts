import { TestBed } from '@angular/core/testing';

import { SpeechSynthesisUtteranceFactoryService } from './speech-synthesis-utterance-factory.service';

describe('SpeechSynthesisUtteranceFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechSynthesisUtteranceFactoryService = TestBed.get(SpeechSynthesisUtteranceFactoryService);
    expect(service).toBeTruthy();
  });
});
