import { Injectable, Optional, Inject } from '@angular/core';

import {
  Lang,
  Voice,
  Volume,
  Rate,
  Pitch,
  OnStartHandler,
  OnEndHandler,
  OnErrorHandler,
  OnPauseHandler,
  OnResumeHandler,
  OnMarkHandler,
  OnBoundaryHandler,
  SpeechSynthesisUtteranceEventHandler,
  SpeechSynthesisUtteranceConfig,
  Config,
  SpeechSynthesisUtteranceErrorEventHandler,
} from '../configs';
import { SpeechSynthesisVoice } from '../adapters/adapter';
/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisUtteranceFactoryService {
  private _config?: SpeechSynthesisUtteranceConfig;
  private _lang?: string;
  private _voice?: SpeechSynthesisVoice;
  private _volume?: number;
  private _rate?: number;
  private _pitch?: number;
  private _onstart?: SpeechSynthesisUtteranceEventHandler;
  private _onend?: SpeechSynthesisUtteranceEventHandler;
  private _onerror?: SpeechSynthesisUtteranceErrorEventHandler;
  private _onpause?: SpeechSynthesisUtteranceEventHandler;
  private _onresume?: SpeechSynthesisUtteranceEventHandler;
  private _onmark?: SpeechSynthesisUtteranceEventHandler;
  private _onboundary?: SpeechSynthesisUtteranceEventHandler;


  /**
   * If SpeechSynthesis API is supported
   * by the browser instance will be included.
   */
  private internal: SpeechSynthesis;

  constructor(
    @Optional() @Inject(Config)
    config?: SpeechSynthesisUtteranceConfig,

    @Optional() @Inject(Lang)
    /**
     * This attribute specifies the language of the speech synthesis for the utterance,
     * using a valid BCP 47 language tag.
     * [BCP47] If unset it remains unset for getting in script,
     * but will default to use the language of the html document root element and associated hierarchy.
     * This default value is computed and used when the input request opens a connection
     * to the recognition service.
     */
    lang?: string,

    @Optional() @Inject(Voice)
    /**
     * This attribute specifies the speech synthesis voice that the web application wishes to use.
     * When a SpeechSynthesisUtterance object is created this attribute must be initialized to null.
     * If, at the time of the speak() method call,
     * this attribute has been set to one of the SpeechSynthesisVoice objects returned by getVoices(),
     * then the user agent must use that voice. If this attribute is unset or null at the time of the speak()
     * method call, then the user agent must use a user agent default voice.
     * The user agent default voice should support the current language (see lang) and
     * can be a local or remote speech service and can incorporate end user choices via interfaces
     * provided by the user agent such as browser configuration parameters.
     */
    voice?: SpeechSynthesisVoice | string,

    @Optional() @Inject(Volume)
    /**
     * This attribute specifies the speaking volume for the utterance.
     * It ranges between 0 and 1 inclusive, with 0 being the lowest volume and 1 the highest volume,
     * with a default of 1. If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    volume?: number,

    @Optional() @Inject(Rate)
    /**
     * This attribute specifies the speaking rate for the utterance.
     * It is relative to the default rate for this voice.
     * 1 is the default rate supported by the speech synthesis engine or specific voice
     * (which should correspond to a normal speaking rate).
     * 2 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10 are strictly disallowed,
     * but speech synthesis engines or specific voices may constrain the minimum and maximum rates further,
     * for example, a particular voice may not actually speak faster than 3 times normal
     * even if you specify a value larger than 3.
     * If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    rate?: number,

    @Optional() @Inject(Pitch)
    /**
     * This attribute specifies the speaking pitch for the utterance.
     * It ranges between 0 and 2 inclusive, with 0 being the lowest pitch and 2 the highest pitch.
     * 1 corresponds to the default pitch of the speech synthesis engine or specific voice.
     * Speech synthesis engines or voices may constrain the minimum and maximum rates further.
     * If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    pitch?: number,

    @Optional() @Inject(OnStartHandler)
    /**
     * Fired when this utterance has begun to be spoken.
     */
    onstart?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnEndHandler)
    /**
     * Fired when this utterance has completed being spoken. If this event fires,
     * the error event must not be fired for this utterance.
     */
    onend?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnErrorHandler)
    /**
     * Fired if there was an error that prevented successful speaking of this utterance.
     * If this event fires, the end event must not be fired for this utterance.
     */
    onerror?: SpeechSynthesisUtteranceErrorEventHandler,

    @Optional() @Inject(OnPauseHandler)
    /**
     * Fired when and if this utterance is paused mid-utterance.
     */
    onpause?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnResumeHandler)
    /**
     * Fired when and if this utterance is resumed after being paused mid-utterance.
     * Adding the utterance to the queue while the global SpeechSynthesis instance is in the paused state,
     * and then calling the resume method does not cause the resume event to be fired,
     * in this case the utterance’s start event will be called when the utterance starts.
     */
    onresume?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnMarkHandler)
    /**
     * Fired when the spoken utterance reaches a named "mark" tag in SSML.
     * [SSML] The user agent must fire this event if the speech synthesis engine provides the event.
     */
    onmark?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnBoundaryHandler)
    /**
     * Fired when the spoken utterance reaches a word or sentence boundary.
     * The user agent must fire this event if the speech synthesis engine provides the event.
     */
    onboundary?: SpeechSynthesisUtteranceEventHandler,

  ) {
    this.internal = window.speechSynthesis;
    this._config = config;
    this._lang = lang;
    if (typeof voice === 'string') {
      this.internal
        .addEventListener('voiceschanged', () => {
          this._voice = this.internal
            .getVoices().find(v => v.name === voice);
        });
    } else {
      this._voice = voice;
    }
    this._volume = volume;
    this._rate = rate;
    this._pitch = pitch;
    this._onstart = onstart;
    this._onend = onend;
    this._onerror = onerror;
    this._onpause = onpause;
    this._onresume = onresume;
    this._onmark = onmark;
    this._onboundary = onboundary;
  }

  /**
   * This attribute specifies the language of the speech synthesis for the utterance,
   * using a valid BCP 47 language tag.
   * [BCP47] If unset it remains unset for getting in script,
   * but will default to use the language of the html document root element and associated hierarchy.
   * This default value is computed and used when the input request opens a connection
   * to the recognition service.
   */
  get lang(): string {
    return this._lang || this._config.lang;
  }

  set lang(lang: string) {
    this._lang = lang;
  }

  /**
   * This attribute specifies the speech synthesis voice that the web application wishes to use.
   * When a SpeechSynthesisUtterance object is created this attribute must be initialized to null.
   * If, at the time of the speak() method call,
   * this attribute has been set to one of the SpeechSynthesisVoice objects returned by getVoices(),
   * then the user agent must use that voice. If this attribute is unset or null at the time of the speak()
   * method call, then the user agent must use a user agent default voice.
   * The user agent default voice should support the current language (see lang) and
   * can be a local or remote speech service and can incorporate end user choices via interfaces
   * provided by the user agent such as browser configuration parameters.
   */
  get voice(): SpeechSynthesisVoice {
    return this._voice || this._config.voice;
  }
  set voice(voice: SpeechSynthesisVoice) {
    this._voice = voice;
  }

  /**
   * This attribute specifies the speaking volume for the utterance.
   * It ranges between 0 and 1 inclusive, with 0 being the lowest volume and 1 the highest volume,
   * with a default of 1. If SSML is used, this value will be overridden by prosody tags in the markup.
   */
  get volume(): number {
    return this._volume || this._config.volume;
  }

  set volume(volume: number) {
    this._volume = volume;
  }

  /**
   * This attribute specifies the speaking rate for the utterance.
   * It is relative to the default rate for this voice.
   * 1 is the default rate supported by the speech synthesis engine or specific voice
   * (which should correspond to a normal speaking rate).
   * 2 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10 are strictly disallowed,
   * but speech synthesis engines or specific voices may constrain the minimum and maximum rates further,
   * for example, a particular voice may not actually speak faster than 3 times normal
   * even if you specify a value larger than 3.
   * If SSML is used, this value will be overridden by prosody tags in the markup.
   */
  get rate(): number {
    return this._rate || this._config.rate;
  }

  set rate(rate: number) {
    this._rate = rate;
  }

  /**
   * This attribute specifies the speaking pitch for the utterance.
   * It ranges between 0 and 2 inclusive, with 0 being the lowest pitch and 2 the highest pitch.
   * 1 corresponds to the default pitch of the speech synthesis engine or specific voice.
   * Speech synthesis engines or voices may constrain the minimum and maximum rates further.
   * If SSML is used, this value will be overridden by prosody tags in the markup.
   */
  get pitch(): number {
    return this._pitch || this._config.pitch;
  }

  set pitch(pitch: number) {
    this._pitch = pitch;
  }

  /**
   * Fired when this utterance has begun to be spoken.
   */
  get onstart(): SpeechSynthesisUtteranceEventHandler {
    return this._onstart || this._config.onstart;
  }

  set onstart(onstart: SpeechSynthesisUtteranceEventHandler) {
    this._onstart = onstart;
  }

  /**
   * Fired when this utterance has completed being spoken. If this event fires,
   * the error event must not be fired for this utterance.
   */
  get onend(): SpeechSynthesisUtteranceEventHandler {
    return this._onend || this._config.onend;
  }

  set onend(onend: SpeechSynthesisUtteranceEventHandler) {
    this._onend = onend;
  }

  /**
   * Fired if there was an error that prevented successful speaking of this utterance.
   * If this event fires, the end event must not be fired for this utterance.
   */
  get onerror(): SpeechSynthesisUtteranceErrorEventHandler {
    return this._onerror || this._config.onerror;
  }

  set onerror(onerror: SpeechSynthesisUtteranceErrorEventHandler) {
    this._onerror = onerror;
  }

  /**
   * Fired when and if this utterance is paused mid-utterance.
   */
  get onpause(): SpeechSynthesisUtteranceEventHandler {
    return this._onpause || this._config.onpause;
  }

  set onpause(onpause: SpeechSynthesisUtteranceEventHandler) {
    this._onpause = onpause;
  }

  /**
   * Fired when and if this utterance is resumed after being paused mid-utterance.
   * Adding the utterance to the queue while the global SpeechSynthesis instance is in the paused state,
   * and then calling the resume method does not cause the resume event to be fired,
   * in this case the utterance’s start event will be called when the utterance starts.
   */
  get onresume(): SpeechSynthesisUtteranceEventHandler {
    return this._onresume || this._config.onresume;
  }

  set onresume(onresume: SpeechSynthesisUtteranceEventHandler) {
    this._onresume = onresume;
  }

  /**
   * Fired when the spoken utterance reaches a named "mark" tag in SSML.
   * [SSML] The user agent must fire this event if the speech synthesis engine provides the event.
   */
  get onmark(): SpeechSynthesisUtteranceEventHandler {
    return this._onmark || this._config.onmark;
  }

  set onmark(onmark: SpeechSynthesisUtteranceEventHandler) {
    this._onmark = onmark;
  }

  /**
   * Fired when the spoken utterance reaches a word or sentence boundary.
   * The user agent must fire this event if the speech synthesis engine provides the event.
   */
  get onboundary(): SpeechSynthesisUtteranceEventHandler {
    return this._onboundary || this._config.onboundary;
  }

  set onboundary(onboundary: SpeechSynthesisUtteranceEventHandler) {
    this._onboundary = onboundary;
  }

  /**
   * This attribute specifies the text to be synthesized and spoken for this utterance.
   * This may be either plain text or a complete, well-formed SSML document.
   * [SSML] For speech synthesis engines that do not support SSML,
   * or only support certain tags, the user agent or speech engine must strip away
   * the tags they do not support and speak the text. There may be a maximum length of the text,
   * it may be limited to 32,767 characters.
   */
  public text(text: string): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang       = this.lang;
    utterance.voice      = this.voice;
    utterance.volume     = this.volume;
    utterance.rate       = this.rate;
    utterance.pitch      = this.pitch;
    utterance.onstart    = this.onstart;
    utterance.onend      = this.onend;
    utterance.onerror    = this.onerror;
    utterance.onpause    = this.onpause;
    utterance.onresume   = this.onresume;
    utterance.onmark     = this.onmark;
    utterance.onboundary = this.onboundary;

    return utterance;
  }
}
