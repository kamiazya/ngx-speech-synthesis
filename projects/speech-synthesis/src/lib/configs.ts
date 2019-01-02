import { InjectionToken } from '@angular/core';

export type SpeechSynthesisUtteranceEventHandler = ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

export type SpeechSynthesisUtteranceErrorEventHandler = ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisErrorEvent) => any) | null;

export interface SpeechSynthesisUtteranceConfig {
  lang?: string;
  onboundary?: SpeechSynthesisUtteranceEventHandler;
  onend?: SpeechSynthesisUtteranceEventHandler;
  onerror?: SpeechSynthesisUtteranceErrorEventHandler;
  onmark?: SpeechSynthesisUtteranceEventHandler;
  onpause?: SpeechSynthesisUtteranceEventHandler;
  onresume?: SpeechSynthesisUtteranceEventHandler;
  onstart?: SpeechSynthesisUtteranceEventHandler;
  pitch?: number;
  rate?: number;
  text?: string;
  voice?: SpeechSynthesisVoice;
  volume?: number;
}


export const Lang              = new InjectionToken<string>('speech-synthesis.lang');
export const Voice             = new InjectionToken<string>('speech-synthesis.voice');
export const Volume            = new InjectionToken<number>('speech-synthesis.volume');
export const Rate              = new InjectionToken<boolean>('speech-synthesis.rate');
export const Pitch             = new InjectionToken<number>('speech-synthesis.pitch');
export const OnStartHandler    = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onstart');
export const OnEndHandler      = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onend');
export const OnErrorHandler    = new InjectionToken<SpeechSynthesisUtteranceErrorEventHandler>('speech-synthesis.onerror');
export const OnPauseHandler    = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onpause');
export const OnResumeHandler   = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onresume');
export const OnMarkHandler     = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onmark');
export const OnBoundaryHandler = new InjectionToken<SpeechSynthesisUtteranceEventHandler>('speech-synthesis.onboundary');
export const Config            = new InjectionToken<SpeechSynthesisUtteranceConfig>('speech-synthesis.config');
